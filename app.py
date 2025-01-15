from flask import Flask, render_template, request
app = Flask(__name__)
def assembly_line_scheduling(n, a, t, e, x):
    """
    Calculate the optimal time for assembly line scheduling.
    
    :param n: Number of stations.
    :param a: List of station times (a[0] for Line 1, a[1] for Line 2).
    :param t: List of transfer times (t[0] for Line 1, t[1] for Line 2).
    :param e: List of entry times (e[0] for Line 1, e[1] for Line 2).
    :param x: List of exit times (x[0] for Line 1, x[1] for Line 2).
    :return: Optimal time, exit line, and path details.
    """
    # Initialize arrays
    f1 = [0] * n
    f2 = [0] * n
    l1 = [0] * n
    l2 = [0] * n
    
    # Entry times
    f1[0] = e[0] + a[0][0]
    f2[0] = e[1] + a[1][0]
    
    # Calculate optimal time for each station
    for j in range(1, n):
        # Line 1
        if f1[j-1] + a[0][j] <= f2[j-1] + t[1][j-1] + a[0][j]:
            f1[j] = f1[j-1] + a[0][j]
            l1[j] = 1
        else:
            f1[j] = f2[j-1] + t[1][j-1] + a[0][j]
            l1[j] = 2
        # Line 2
        if f2[j-1] + a[1][j] <= f1[j-1] + t[0][j-1] + a[1][j]:
            f2[j] = f2[j-1] + a[1][j]
            l2[j] = 2
        else:
            f2[j] = f1[j-1] + t[0][j-1] + a[1][j]
            l2[j] = 1
    
    # Calculate final optimal time
    if f1[-1] + x[0] <= f2[-1] + x[1]:
        f_opt = f1[-1] + x[0]
        l_opt = 1
    else:
        f_opt = f2[-1] + x[1]
        l_opt = 2
    
    # Build the optimal path with transfer details
    path = []
    l = l_opt
    for j in range(n-1, 0, -1):
        path.append(f"Line {l}, Station {j+1}, Time = {a[l-1][j]}")
        if l == 1:
            if l1[j] == 2:
                path.append(
                    f"Transfer from Line 1 to Line 2, Time = {t[0][j-1]}")
            l = l1[j]
        else:
            if l2[j] == 1:
                path.append(
                    f"Transfer from Line 2 to Line 1, Time = {t[1][j-1]}")
            l = l2[j]
    path.append(f"Line {l}, Station 1, Time = {a[l-1][0]}")
    path.append(f"Entry e{l} = {e[l-1]}")
    return f_opt, l_opt, path

# Route for the home page
@app.route('/')
def home():
    return render_template('home.html')

# Route for the input page
@app.route('/input', methods=['GET', 'POST'])
def input_page():
    if request.method == 'POST':
        n = int(request.form['n'])
        e1 = int(request.form['e1'])
        e2 = int(request.form['e2'])
        x1 = int(request.form['x1'])
        x2 = int(request.form['x2'])
        a = [[0] * n for _ in range(2)]
        t = [[0] * (n-1) for _ in range(2)]
        for i in range(2):
            for j in range(n):
                a[i][j] = int(request.form[f'a{i}{j}'])
        for i in range(2):
            for j in range(n-1):
                t[i][j] = int(request.form[f't{i}{j}'])
        f_opt, l_opt, path = assembly_line_scheduling(
            n, a, t, [e1, e2], [x1, x2])
        return render_template('result.html', f_opt=f_opt, l_opt=l_opt, path=path, x1=x1, x2=x2)
    return render_template('input.html', n=0)
if __name__ == '__main__':
    app.run(debug=True)
