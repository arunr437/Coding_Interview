window.onload = function () {
    var myArr;
    //Initailly 1 record per page will be shown. User can choose to display more records per page using the dropdown.
    var pageNumber = 1;
    var employeesPerPage = 1;
    var employeeNumber = 1;
    var xmlhttp = new XMLHttpRequest();
    var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";

    //Getting the employee details from the URL and storing it in a JavaScript variable myArr
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myArr = this.responseText;
            //Calling the function to convert the JSON string into an array of objects and to write the data to HTML
            getEmployeeDetails(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //Custom Pagination logic. User can input the required number of records to be displayed in a single page. 
    //Adding onchange event listener to the Number of Records per page dropdown box. This can be used to show more employees. 
    document.getElementById("number").addEventListener("change", function () {
        employeesPerPage = document.getElementById("number").value;
        getEmployeeDetails(myArr);
    })

    //Adding event listener for next and previous links. These links are used to switch between employees
    document.getElementById("prev").addEventListener("click", prev);
    document.getElementById("next").addEventListener("click", next);

    //When next link is clicked, the next page is shown
    function next() {
        pageNumber++;
        getEmployeeDetails(myArr);
    }

    //When next link is clicked, the next page is shown
    function prev() {
        pageNumber--;
        getEmployeeDetails(myArr);
    }

    //Main logic. Function takes the JSON string as input. This is parsed into a Javascript object which will be used to get employee data
    function getEmployeeDetails(input) {
        var obj = JSON.parse(input);
        var output = "";

        //If pageNumber is 1, the 'prev' link will be disabled.
        if (pageNumber == 1) {
            document.getElementById("prev").classList.add("disable");
        } else {
            if (document.getElementById("prev").classList.contains("disable")) {
                document.getElementById("prev").classList.remove("disable");
            }
        }

        //If pageNumber is equal to the last page, the 'next' link will be disabled.
        if (!obj[pageNumber * employeesPerPage + 1]) {
            document.getElementById("next").classList.add("disable");
        } else {
            if (document.getElementById("next").classList.contains("disable")) {
                document.getElementById("next").classList.remove("disable");
            }
        }
        //Loop to iterate through the records in each page and to write it into HTML.
        for (var i = employeesPerPage * (pageNumber - 1); i < pageNumber * employeesPerPage; i++) {
            employeeNumber = i;

            if (!obj[employeeNumber + 1]) {
                continue;
            }
            var id = obj[employeeNumber + 1].employeeid;
            var firstName = obj[employeeNumber + 1].employeefname;
            var lastName = obj[employeeNumber + 1].employeelname;
            var bio = obj[employeeNumber + 1].employeebio;
            var employeeHasPic = obj[employeeNumber + 1].employeehaspic;
            var employeeIsFeatured = obj[employeeNumber + 1].employeeisfeatured;
            var roles = obj[employeeNumber + 1].roles;

            output += "<div id='employee'>";
            output += "<div id='crown'>";

            //If employee is featured the crown icon will be added.
            if (employeeIsFeatured == 1) {
                output += "<img src='crown.png' width='25px' alt='Crown Image'/>"
            }
            output += "</div>";
            output += "<div class = 'clear'></div >";
            output += "<div id = 'image'>";

            //If employee has a picture, it will be inserted.
            if (employeeHasPic == 1) {
                output += "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/" + (employeeNumber + 1) + ".jpg' alt='Employee Image' />"
            }
            output += "</div>";
            output += "<div id = 'name'>";
            output += "<span id = 'firstName'>" + firstName + "</span><span id ='lastName'>" + lastName + "</span></div >";
            output += "<div id ='bio'>" + bio + "</div>";
            output += "<div id = 'role'>";

            //Loop to get the list of roles and it's details
            for (var j = 0; j < roles.length; j++) {
                name = roles[j].rolename;
                color = roles[j].rolecolor;
                id = roles[j].roleid;
                output += "<span class='role' style='background-color:" + color + "' >" + name + "</span>";
            }
            output += "</div>";
            output += "</div>";
        }

        //Inserting the output to employeeList div tag
        document.getElementById("employeeList").innerHTML = output;
        document.getElementById("pageNumber").innerHTML = "Page Number: " + pageNumber;

    }
}
