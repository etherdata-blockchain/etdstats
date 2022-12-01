from typing import Optional
from locust import FastHttpUser, task


class TransactionUser(FastHttpUser):
    host: Optional[str] = "https://etdstatsapi.net/stats/analytics"

    @task
    def get_transaction(self):
        self.client.get("")
