from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict

router = APIRouter()

# Penyimpanan sementara audiens yang aktif di tiap room
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str):
        self.active_connections[room_id].remove(websocket)

    async def broadcast_to_room(self, message: dict, room_id: str):
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                await connection.send_json(message)

manager = ConnectionManager()

@router.websocket("/ws/live/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket, room_id)
    try:
        # Kirim update jumlah audiens saat ada yang join
        await manager.broadcast_to_room({
            "type": "update_audience",
            "count": len(manager.active_connections[room_id])
        }, room_id)
        
        while True:
            data = await websocket.receive_json()
            # Logic Chat atau Corat-coret (Whiteboard)
            await manager.broadcast_to_room({
                "type": "message",
                "user": data.get("user"),
                "content": data.get("content")
            }, room_id)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
        await manager.broadcast_to_room({
            "type": "update_audience",
            "count": len(manager.active_connections.get(room_id, []))
        }, room_id)