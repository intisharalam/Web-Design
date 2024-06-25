from fastapi import FastAPI, HTTPException
import httpx
import os
from dotenv import load_dotenv
import asyncio

# Load environment variables from .env.local
load_dotenv(dotenv_path='../.env.local')

# Retrieve API key from environment variables
ALPHA_API_KEY = os.getenv('NEXT_PUBLIC_ALPHA_API_KEY')

# Initialize FastAPI app
app = FastAPI()

# Helper function to fetch data with retry logic
async def fetch_with_retries(url, retries=3, delay=2):
    async with httpx.AsyncClient() as client:
        for attempt in range(retries):
            try:
                response = await client.get(url)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 429:
                    if attempt < retries - 1:
                        await asyncio.sleep(delay)
                        continue
                    else:
                        raise HTTPException(status_code=429, detail="Too Many Requests")
                else:
                    raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
            except Exception as e:
                if attempt < retries - 1:
                    await asyncio.sleep(delay)
                    continue
                else:
                    raise HTTPException(status_code=500, detail=str(e))

# Define API endpoint to fetch company data for IBM
@app.post("/api/get_company_data")
async def get_company_data():
    symbol = "IBM"  # Hardcoded symbol for IBM

    try:
        # Fetching company overview endpoint from Alpha Vantage
        overview_url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={ALPHA_API_KEY}'
        print(overview_url)
        overview_data = await fetch_with_retries(overview_url)

        if not overview_data:
            raise HTTPException(status_code=404, detail="Company data not found")

        # Extract relevant data
        company_name = overview_data.get('Name', 'N/A')
        sector = overview_data.get('Sector', 'N/A')
        market_cap = overview_data.get('MarketCapitalization', 'N/A')
        pe_ratio = overview_data.get('PERatio', 'N/A')
        dividend_yield = overview_data.get('DividendYield', 'N/A')
        beta = overview_data.get('Beta', 'N/A')

        # Print company data to console
        print(f"Company Name: {company_name}")
        print(f"Sector: {sector}")
        print(f"Market Cap: {market_cap}")
        print(f"P/E Ratio: {pe_ratio}")
        print(f"Dividend Yield: {dividend_yield}")
        print(f"Beta: {beta}")

        return {"message": "Company data printed in console"}

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))