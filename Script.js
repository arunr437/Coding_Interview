window.onload = function () {

    var myArr;

    //When the page loads, employee 1 is shown by default. To switch between other employees the next and prev links can be used. 
    var number = 1;
    var xmlhttp = new XMLHttpRequest();
    var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myArr = this.responseText;
            getEmployeeDetails(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //Adding event listener for next and previous links. These links are used to switch between employees
    document.getElementById("prev").addEventListener("click", prev);
    document.getElementById("next").addEventListener("click", next);

    //When next link is clicked, the next 
    function next() {
        number++;
        getEmployeeDetails(myArr);
    }

    function prev() {
        number--;
        getEmployeeDetails(myArr);
    }

    function getEmployeeDetails(input) {
        var obj = JSON.parse(input);
        var output = "";

        //        if (!JSON.parse(myArr)[number - 1]) {
        //            document.getElementById("prev").classList.add("disable");
        //        } else {
        //            if (document.getElementById("prev").classList.contains("disable")) {
        //                document.getElementById("prev").classList.remove("disable");
        //            }
        //        }
        //
        //        if (!JSON.parse(myArr)[number + 1]) {
        //            document.getElementById("next").classList.add("disable");
        //        } else {
        //            if (document.getElementById("next").classList.contains("disable")) {
        //                document.getElementById("next").classList.remove("disable");
        //            }
        //        }
        for (var i = 1; i <= Object.keys(obj).length; i++) {
            var id = obj[i].employeeid;
            var firstName = obj[i].employeefname;
            var lastName = obj[i].employeelname;
            var bio = obj[i].employeebio;
            var employeeHasPic = obj[i].employeehaspic;
            var employeeIsFeatured = obj[i].employeeisfeatured;
            var roles = obj[i].roles;

            var output = "";
            output += "<div id='employee'>";
            output += "<div id='crown'>";
            if (employeeIsFeatured == 1) {
                output += "<img src='crown.png' width='25px' alt='Crown Image'/>"
            }
            output += "</div>";
            output += "<div class = 'clear'></div >";
            output += "<div id = 'image'>";

            if (employeeHasPic == 1) {
                output += "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/" + i + ".jpg' alt='Employee Image' />"
            }
            output += "</div>";
            output += "<div id = 'name'>";
            output += "<span id = 'firstName'>" + firstName + "</span><span id ='lastName'>" + lastName + "</span></div >";
            output += "<div id ='bio'>" + bio + "</div>";
            output += "<div id = 'role'>";

            for (var j = 0; j < roles.length; j++) {
                name = roles[j].rolename;
                color = roles[j].rolecolor;
                id = roles[j].roleid;
                output += "<span class='role' style='background-color:" + color + "' >" + name + "</span>";
            }

            output += "</div>";
            output += "</div>";

            document.getElementById("employeeList").innerHTML += output;





        }


        //        //Getting employee first and last name
        //        document.getElementById("firstName").innerHTML = firstName;
        //        document.getElementById("lastName").innerHTML = lastName;
        //
        //        //Checking if the current employee has an image and inserting it there's one
        //        if (employeeHasPic == 1) {
        //            document.getElementById('image').innerHTML = "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/" + number + ".jpg' alt='Employee Image' />"
        //        } else {
        //            document.getElementById('image').innerHTML = "";
        //        }
        //
        //        //Checking if the current employee has an image and inserting it
        //        if (employeeIsFeatured == 1) {
        //            document.getElementById('crown').innerHTML = "<img src='crown.png' width='25px' alt='Crown Image'/>"
        //        } else {
        //            document.getElementById('crown').innerHTML = "";
        //        }
        //
        //        //Getting employee bio
        //        document.getElementById("bio").innerHTML = bio;
        //
        //        //Getting employee roles from the file and styling the roles based on values in JSON
        //        document.getElementById("role").innerHTML = "";
        //        for (var i = 0; i < roles.length; i++) {
        //            name = roles[i].rolename;
        //            color = roles[i].rolecolor;
        //            id = roles[i].roleid;
        //            document.getElementById("role").innerHTML += "<span class='role' id='role" + id + "' >" + name + "</span>";
        //            var all = document.getElementsByClassName('role');
        //            document.getElementById("role" + id).style.backgroundColor = color;
        //        }


    }
};
