# ITE_BID601_HW
Made by: osama_177186 _ hasan_171117 _ omar_154129 _ kamar_180726 _ rama_158075 _ majedah_137770 etaf_154254

### README: Assembly Line Scheduling Flask Application

---

#### **Overview**
This project is a Flask-based web application that calculates the optimal time for completing tasks on an assembly line using the **Assembly Line Scheduling algorithm**. Users can input the number of stations, station times, transfer times, entry times, and exit times for two assembly lines. The application computes the optimal time, the exit line, and details the path taken.

---

#### **Features**
- Calculate the optimal scheduling time for a two-line assembly system.
- Visualize the path taken, including station times and transfer details.
- User-friendly web interface with input forms and result display.

---

#### **Project Structure**
- **`app.py`**: The main Flask application containing the implementation of the Assembly Line Scheduling algorithm and routing logic.
- **Templates**:
  - `home.html`: The homepage of the application.
  - `input.html`: Input form for entering assembly line details.
  - `result.html`: Displays the computed optimal time, exit line, and path.
- **Static Folder**: For additional CSS and JavaScript files to enhance the UI.

---

#### **Algorithm Explanation**
The Assembly Line Scheduling algorithm computes:
1. **Optimal times for each station** using dynamic programming:
   - Calculates the time for each station on both lines.
   - Considers station times, transfer times, entry, and exit times.
2. **Path tracing**:
   - Determines the sequence of stations and transfers to achieve the optimal schedule.

---

#### **Setup Instructions**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/osamaju/ITE_BID601_HW.git
   ```
2. **Open directory**:
   ```bash
   cd ITE_BID601_HW
   ```
3. **Install dependencies**:
   Ensure you have Python 3 installed. Install Flask using:
   ```bash
   pip install flask
   ```
4. **Run the application**:
   Start the Flask development server:
   ```bash
   python app.py
   ```
   The app will run on `http://127.0.0.1:5000`.

---

#### **Usage**
1. Open the application in a web browser.
2. Navigate to the **Input Page**.
3. Enter the required details:
   - Number of stations (`n`).
   - Entry times for Line 1 and Line 2 (`e1`, `e2`).
   - Exit times for Line 1 and Line 2 (`x1`, `x2`).
   - Station times (`a`): Time taken at each station for both lines.
   - Transfer times (`t`): Time to switch between lines.
4. Submit the form to compute the results.
5. View the **optimal time**, **exit line**, and the **path** on the results page.

---

#### **Example Input Format**
For a system with 4 stations:
- **Entry Times**: `e1 = 2, e2 = 4`
- **Exit Times**: `x1 = 3, x2 = 2`
- **Station Times**:
  ```
  a[0] = [7, 9, 3, 4]  (Line 1)
  a[1] = [8, 5, 6, 4]  (Line 2)
  ```
- **Transfer Times**:
  ```
  t[0] = [2, 3, 1]  (Line 1 to Line 2)
  t[1] = [2, 1, 2]  (Line 2 to Line 1)
  ```

---

#### **Output**
- **Optimal Time**: Minimum time required to complete the process.
- **Exit Line**: The line from which the process exits.
- **Path**: Sequence of stations and transfers.

---

#### **Customization**
- Modify the HTML templates in the `templates/` directory to update the UI.
- Extend the algorithm in `app.py` to handle more complex scenarios, such as multiple assembly lines.

---

#### **Dependencies**
- **Flask**: Lightweight Python web framework.

---

Enjoy using the Assembly Line Scheduling Flask Application! 

osama_177186 _ hasan_171117 _ omar_154129 _ kamar_180726 _ rama_158075 _ majedah_137770
