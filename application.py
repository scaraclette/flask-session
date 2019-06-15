from flask import Flask, render_template, request, session, jsonify
from flask_session import Session

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST", "GET"])
def login():
    if session.get("username") is None:
            session["username"] = "NO USERNAME SUBMITTED"

    if request.method == "POST":
        username = request.form.get("username")
        if username is not None:
            session["username"] = username

    return jsonify({"username":session["username"]})

@app.route("/logout", methods=["GET"])
def logout():
    session.pop("username", None)
    return jsonify({"msg":"logged out"})