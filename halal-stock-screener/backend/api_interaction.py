# api_interaction.py

import httpx
import os
import datetime
import random
from exceptions import handle_api_exception, CustomException

ALPHA_API_KEY = os.getenv('NEXT_PUBLIC_ALPHA_API_KEY')
NEWS_API_KEY = os.getenv('NEXT_PUBLIC_NEWS_API_KEY')

async def fetch_company_financial_data(symbol):
    try:
        # Fetch company overview data
        overview_url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={ALPHA_API_KEY}'
        print(overview_url)
        async with httpx.AsyncClient() as client:
            response = await client.get(overview_url)
            response.raise_for_status()
            overview_data = response.json()

            if not overview_data:
                raise ValueError("Company data not found")

            # Fetch cash flow data
            cash_flow_url = f'https://www.alphavantage.co/query?function=CASH_FLOW&symbol={symbol}&apikey={ALPHA_API_KEY}'
            print(cash_flow_url)
            response = await client.get(cash_flow_url)
            response.raise_for_status()
            cash_flow_data = response.json()

            if not cash_flow_data or 'annualReports' not in cash_flow_data:
                raise ValueError("Cash flow data not found or invalid format")

            # Fetch balance sheet data
            balance_sheet_url = f'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol={symbol}&apikey={ALPHA_API_KEY}'
            print(balance_sheet_url)
            response = await client.get(balance_sheet_url)
            response.raise_for_status()
            balance_sheet_data = response.json()

            if not balance_sheet_data or 'annualReports' not in balance_sheet_data:
                raise ValueError("Balance sheet data not found or invalid format")

            annual_reports = balance_sheet_data['annualReports']
            if not annual_reports:
                raise ValueError("No annual reports found in balance sheet data")
            
            

            # Prepare list to store asset-liability data
            asset_liability = []

            # Iterate over the last 3 years or available reports
            for report in annual_reports[:min(len(annual_reports), 3)]:
                year = report.get('fiscalDateEnding', 'N/A')
                total_assets = float(report.get('totalAssets', '0'))
                total_liabilities = float(report.get('totalLiabilities', '0'))

                asset_liability.append({
                    "Year": year,
                    "assets": total_assets,
                    "liabilities": total_liabilities
                })

            # Extract data from the latest report
            latest_report = annual_reports[0]

            # Calculate liquidity ratio
            total_current_assets = float(latest_report.get('totalCurrentAssets', '0'))
            total_current_liabilities = float(latest_report.get('totalCurrentLiabilities', '0'))
            liquidity_ratio = total_current_assets / total_current_liabilities if total_current_liabilities != 0 else 0.0

            # Checking for negative earnings within available historical data
            earnings_consistency = "Positive"
            for report in annual_reports[:min(len(annual_reports), 10)]:
                net_income = float(report.get('netIncome', '0'))
                if net_income < 0:
                    earnings_consistency = "Negative"
                    break

            # Calculate debt to equity ratio
            total_liabilities = float(latest_report.get('totalLiabilities', '0'))
            total_shareholder_equity = float(latest_report.get('totalShareholderEquity', '0'))
            debt_to_equity_ratio = total_liabilities / total_shareholder_equity if total_shareholder_equity != 0 else 0.0

            annual_reports_cash_flow = cash_flow_data['annualReports']

            # Calculate earnings growth rate over the last 10 years or available years
            num_years_cash_flow = min(len(annual_reports_cash_flow), 10)
            first_year_income_cash_flow = float(annual_reports_cash_flow[-num_years_cash_flow].get('netIncome', '0'))
            last_year_income_cash_flow = float(annual_reports_cash_flow[0].get('netIncome', '0'))

            if first_year_income_cash_flow != 0:
                earnings_growth_rate = ((last_year_income_cash_flow - first_year_income_cash_flow) / first_year_income_cash_flow) * 100
            else:
                earnings_growth_rate = 0.0

            # Check for uninterrupted dividend payments for at least 10 years
            uninterrupted_dividends = True
            for report in annual_reports_cash_flow[:num_years_cash_flow]:
                dividend_payments = float(report.get('dividendPayout', '0'))
                if dividend_payments == 0:
                    uninterrupted_dividends = False
                    break

            # Fetch monthly close prices data
            monthly_prices_url = f'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol={symbol}&apikey={ALPHA_API_KEY}'
            response = await client.get(monthly_prices_url)
            response.raise_for_status()
            monthly_data = response.json()['Monthly Adjusted Time Series']

            # Process data for up to 3 years
            years_to_fetch = 3
            today_year = datetime.datetime.now().year
            start_year = today_year - years_to_fetch + 1

            processed_data = []
            for date, price_data in monthly_data.items():
                year = int(date.split('-')[0])
                if year >= start_year and year <= today_year:
                    processed_data.append({
                        "time": date,
                        "price": float(price_data['4. close'])
                    })
                    if len(processed_data) >= years_to_fetch * 12:
                        break

            # Calculate non-Sharia compliance metrics
            total_revenue = float(overview_data.get('RevenueTTM', '0'))
            interest_income = float(overview_data.get('InterestIncome', '0'))
            net_interest_expense = float(overview_data.get('InterestExpense', '0')) - interest_income
            other_non_operating_income = float(overview_data.get('OtherNonOperatingIncome', '0'))
            non_permissible_income = float(overview_data.get('NonPermissibleIncome', '0'))

            total_non_sharia_income = interest_income + max(net_interest_expense, 0) + other_non_operating_income + non_permissible_income

            total_interest_bearing_debt = float(latest_report.get('shortTermDebt', '0')) + float(latest_report.get('longTermDebt', '0'))
            total_assets = float(latest_report.get('totalAssets', '0'))

            interest_income_percentage = (interest_income / total_revenue) * 100 if total_revenue != 0 else 0.0

            total_cash_equivalents = float(latest_report.get('cashAndCashEquivalentsAtCarryingValue', '0'))
            short_term_investments = float(latest_report.get('shortTermInvestments', '0'))
            long_term_investments = float(latest_report.get('longTermInvestments', '0'))
            total_interest_bearing_investments = short_term_investments + long_term_investments

            non_permissible_income_percentage = (non_permissible_income / total_revenue) * 100 if total_revenue != 0 else 0.0

            return {
                "Company Name": overview_data.get('Name', 'N/A'),
                "Symbol": symbol,
                "Sector": overview_data.get('Sector', 'N/A'),
                "Market Cap": overview_data.get('MarketCapitalization', '0'),
                "P/E Ratio": overview_data.get('PERatio', '0'),
                "Dividend Yield": overview_data.get('DividendYield', '0'),
                "Beta": overview_data.get('Beta', '0'),
                "Price to Book Ratio": overview_data.get('PriceToBookRatio', '0'),
                "Assets&Liabilities": asset_liability,
                "Liquidity Ratio": liquidity_ratio,
                "Earnings Consistency": earnings_consistency,
                "Debt to Equity Ratio": debt_to_equity_ratio,
                "Total Non-Sharia Income": total_non_sharia_income,
                "Total Interest-bearing Debt": total_interest_bearing_debt,
                "Interest Income Percentage": interest_income_percentage,
                "Total Cash and Equivalents": total_cash_equivalents,
                "Total Interest-bearing Investments": total_interest_bearing_investments,
                "Non-Permissible Income Percentage": non_permissible_income_percentage,
                "Earnings Growth Rate": earnings_growth_rate,
                "Uninterrupted Dividends": uninterrupted_dividends,
                "Monthly Close Prices": processed_data
            }

    except httpx.HTTPStatusError as e:
        handle_api_exception(e)
        return {
            "Company Name": "Unknown",
            "Symbol": symbol,
            "Sector": "N/A",
            "Market Cap": "0",
            "P/E Ratio": "0",
            "Dividend Yield": "0",
            "Beta": "0",
            "Price to Book Ratio": "0",
            "Assets&Liabilities": [
                {"Year": '---', "assets": 10, "liabilities": 5},
                {"Year": '----', "assets": 5, "liabilities": 10},
                {"Year": '-----', "assets": 10, "liabilities": 5},
            ],
            "Liquidity Ratio": 0.0,
            "Earnings Consistency": "N/A",
            "Debt to Equity Ratio": 0.0,
            "Total Non-Sharia Income": 0.0,
            "Total Interest-bearing Debt": 0.0,
            "Interest Income Percentage": 0.0,
            "Total Cash and Equivalents": 0.0,
            "Total Interest-bearing Investments": 0.0,
            "Non-Permissible Income Percentage": 0.0,
            "Earnings Growth Rate": 0.0,
            "Uninterrupted Dividends": False,
            "Monthly Close Prices": [
                {"time": '2024-10-12', "price": 0}
            ]
        }
    except Exception as e:
        handle_api_exception(e)
        return {
            "Company Name": "Unknown",
            "Symbol": symbol,
            "Sector": "N/A",
            "Market Cap": "0",
            "P/E Ratio": "0",
            "Dividend Yield": "0",
            "Beta": "0",
            "Price to Book Ratio": "0",
            "Assets&Liabilities": [
                {"Year": '---', "assets": 10, "liabilities": 5},
                {"Year": '----', "assets": 5, "liabilities": 10},
                {"Year": '-----', "assets": 10, "liabilities": 5},
            ],
            "Liquidity Ratio": 0.0,
            "Earnings Consistency": "N/A",
            "Debt to Equity Ratio": 0.0,
            "Total Non-Sharia Income": 0.0,
            "Total Interest-bearing Debt": 0.0,
            "Interest Income Percentage": 0.0,
            "Total Cash and Equivalents": 0.0,
            "Total Interest-bearing Investments": 0.0,
            "Non-Permissible Income Percentage": 0.0,
            "Earnings Growth Rate": 0.0,
            "Uninterrupted Dividends": False,
            "Monthly Close Prices": [
                {"time": '2024-10-12', "price": 0}
            ]
        }

def generate_dummy_monthly_prices():
    # Generate dummy data for a year's worth of monthly close prices
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=365)

    dummy_data = []
    current_date = start_date
    while current_date <= today:
        dummy_data.append({
            "time": current_date.strftime('%Y-%m-%d'),
            "price": round(random.uniform(50, 200), 2)
        })
        current_date += datetime.timedelta(days=30)

    return dummy_data

async def fetch_news_data():
    try:
        url = 'https://gnews.io/api/v4/search'
        params = {
            'q': 'finance',  # Example query for finance news
            'token': '',  # No API key required for basic usage
            'max': 10,  # Limit to 10 articles
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            news_data = response.json().get('articles', [])
            return news_data
    except httpx.HTTPStatusError as e:
        raise CustomException(f"Error fetching news: {str(e)}")
    except Exception as e:
        raise CustomException(f"Unexpected error fetching news: {str(e)}")