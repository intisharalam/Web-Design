from fastapi import FastAPI, HTTPException
from api_interaction import fetch_company_financial_data, fetch_news_data  # Import your functions from api_interactions.py
from exceptions import CustomException  # Import any custom exceptions you have defined

app = FastAPI()

@app.post("/api/get_company_data")
async def get_company_data():
    symbol = "IBM"  # Hardcoded symbol for IBM

    try:
        company_data = await fetch_company_financial_data(symbol)
    except CustomException as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Combine all data into a single response
    combined_data = {
        **company_data,
    }
    return {"message": "Company data fetched successfully", "data": combined_data}

@app.get("/api/get_newsfeed")
async def get_newsfeed():
    try:
        news_data = await fetch_news_data()
    except CustomException as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "News feed fetched successfully", "data": news_data}
