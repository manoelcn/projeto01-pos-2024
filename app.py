from flask import Flask, redirect, url_for, session, request, jsonify, render_template
from authlib.integrations.flask_client import OAuth
from datetime import datetime


app = Flask(__name__)
app.secret_key = 'development'
oauth = OAuth(app)
oauth.register(
    name='suap',
    client_id='',
    client_secret='',
    api_base_url='https://suap.ifrn.edu.br/api/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://suap.ifrn.edu.br/o/token/',
    authorize_url='https://suap.ifrn.edu.br/o/authorize/',
    fetch_token=lambda: session.get('suap_token')
)

def get_profile_data():
    profile_data = oauth.suap.get("v2/minhas-informacoes/meus-dados")
    session["profile_data"] = profile_data.json()
    return session["profile_data"]


@app.route("/")
def index():
    if "suap_token" in session:
        if "profile_data" not in session:
            get_profile_data()
        return render_template("index.html", profile_data=session["profile_data"])
    else:
        return render_template("login.html")


@app.route("/login")
def login():
    redirect_uri = url_for('auth', _external=True)
    print(redirect_uri)
    return oauth.suap.authorize_redirect(redirect_uri)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/login/authorized')
def auth():
    token = oauth.suap.authorize_access_token()
    session['suap_token'] = token
    return redirect(url_for('index'))


@app.route("/profile")
def profile():
    if "suap_token" in session:
        if "profile_data" not in session:
            get_profile_data()
        return render_template("profile.html", profile_data=session["profile_data"])
    else:
        return render_template("index.html")


@app.route("/grades", methods=["GET"])
def grades():
    if "suap_token" in session:
        if "profile_data" not in session:
            get_profile_data()

        year = request.args.get("school_year", datetime.now().year)
        grades_data = oauth.suap.get(f"v2/minhas-informacoes/boletim/{year}/1/")

        if grades_data:
            return render_template("grades.html", grades_data=grades_data.json(), year=year, profile_data=session["profile_data"])
        else:
            return render_template("grades.html", year=year, profile_data=session["profile_data"])
    else:
        return render_template("index.html")
