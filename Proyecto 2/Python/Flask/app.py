import json

from flask import Flask, request, jsonify
from py2neo import Graph


graph = Graph(password = "proyecto1")
app=Flask(__name__)

@app.route('/')
def index():
    return "hola"


@app.route("/buy", methods=['POST'])
def get_graph():
    servicep=jsonify(request.json['namer'])
    tmp=servicep.get_data(as_text=True)
   # q='CREATE (Hugo:Person {name:"Hugo", born:1960})'
    querie='MATCH (Persona:Person {name:"Paco"}) MATCH(Prodaucto:Service {service:'+tmp+'}) CREATE (Persona)-[:BUY]->(Prodaucto)' 
    graph.run(querie)
    return querie

@app.route("/recomendation")
def get_recomendatiom():
    results = graph.run('MATCH p=(m:Person {name: "Paco"})-[r:BUY]->(s:Service) RETURN s.service AS recommendation, COUNT(*) AS numberOfPurchases ORDER BY numberOfPurchases DESC LIMIT 5')
    nodes = []
    rels = []
    for recommendation in results:
        nodes.append({"recommendation": recommendation})
    for numberOfPurchases in results:
        rels.append({"numberOfPurchases": numberOfPurchases}) 
    return {"Recommendation": nodes, "number Of Purchases": rels}   
   
if __name__ == "__main__":
    app.run(debug=True)