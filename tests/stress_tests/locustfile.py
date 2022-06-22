from typing import Optional
from locust import FastHttpUser, task


class TransactionUser(FastHttpUser):
    host: Optional[str] = "https://api.etdchain.net/stats/transaction"

    @task
    def get_transaction(self):
        self.client.get(
            "/0x77900ba83a59751a1fca6ac3e0e15f28ca6056c95a4a2ea209111e2da10ba95a")
