from flask import Flask, render_template

app = Flask(__name__, template_folder='pages')

@app.route('/')
def home():
    return render_template('quiz1.html')

@app.route('/quiz/<int:step>')
def quiz(step):
    if 1 <= step <= 5:
        return render_template(f'quiz{step}.html')
    else:
        return "Quiz concluído!"

if __name__ == '__main__':
    app.run(debug=True)
