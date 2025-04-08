# scraper/scrape.py

import requests
from bs4 import BeautifulSoup
import json
import os

URL = "https://meclis.gov.az/deputatlar"
response = requests.get(URL)
soup = BeautifulSoup(response.content, "html.parser")

deputatlar = []

for blok in soup.find_all("div", class_="deputat-item"):
    try:
        ad = blok.find("h3").text.strip()
        dairə = blok.find("p").text.strip()
        foto = blok.find("img")["src"]
        partiya = "Bitərəf"  # Saytda göstərilmir deyə default verilir
        haqqinda = "Ətraflı məlumat yoxdur."

        deputatlar.append({
            "ad": ad,
            "dairə": dairə,
            "partiya": partiya,
            "foto": foto,
            "haqqinda": haqqinda
        })
    except:
        continue

# Nəticəni yaz
os.makedirs("data", exist_ok=True)
with open("data/deputatlar.json", "w", encoding="utf-8") as f:
    json.dump(deputatlar, f, ensure_ascii=False, indent=2)

print(f"{len(deputatlar)} deputat yükləndi.")
