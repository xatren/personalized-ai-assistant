# websocket_server.py
import asyncio
import websockets
import json
import random

async def send_stock_updates(websocket, path):
    while True:
        stock_data = {
            'symbol': 'AAPL',
            'price': round(random.uniform(150, 200), 2)
        }
        await websocket.send(json.dumps(stock_data))
        await asyncio.sleep(2)  # Simulate updates every 2 seconds

async def main():
    async with websockets.serve(send_stock_updates, "localhost", 6789):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
