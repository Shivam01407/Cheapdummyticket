<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buy Verifiable Dummy Ticket at Reasonable Price within 60 Minutes.</title>
    <meta name="description" content="Buy a verifiable dummy ticket from us & apply your visa freely. Get Dummy Ticket as a onward ticket.">
    <link rel="icon" type="image/png" href="images/favicon.png">
    <link  href="images/favicon.png" rel="apple-touch-icon">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="./styleRsepons.css">
</head>

<body>
    <div class="header">
        <div class="header_logo">
            <a href="index.php">
            </a>
        </div>
        <div class="headsection" style="font-size: 16px;">
            <a href="https://wa.me/918882627507?text=I%20have%20a%20query%20regarding%20dummy%20tickets." class="headWhatsapp"></a>
            <a href="tel:+918882627507" class="headNumber" style="text-decoration: none; color: black;">+91 8882627507</a>
            <div class="menu_container">

                <div class="menu_bar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="menu">
                    <ul class="menu_list" style="margin-bottom: auto;">
                        <li><a href="buy-ticket.php">Buy Ticket</a></li>
                        <li><a href="contact.php">Contact</a></li>
                    </ul>

                </div>
            </div>
        </div>
    </div>

    <div class="section">
        
        <form action="sendEmail.php" method="post" enctype="multipart/form-data">
            <div class="form-row" id="personContainer">
                <div class="form-row ">
                    <br>
                    <h4 style="margin-left: 2%; font-weight: 500; font-size: x-large;"> Person Details:</h4>
                    
                    <div class="form-row personBox">
                        <hr/>

                        <div class="form-row ">
                            <div class="form-group col-md-2">
                                <label for="title">Title </label>
                                <select class="form-control"  name="title[]"required>
                                    <option selected>Choose...</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Miss">Miss.</option>
                                </select>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="firstname">First Name</label>
                                <input type="text" class="form-control" name="firstname[]" placeholder="First Name" required>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="lastname">Last Name</label>
                                <input type="text" class="form-control" name="lastname[]" placeholder="Last Name" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="dob">DOB</label>
                                <input type="date" class="form-control" name="dob[]" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="nationality">Nationality</label>
                                <input type="text" class="form-control" name="nationality[]" placeholder="Nationality" required>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-primary" style="margin-left: 1%;" onclick="addPerson()">Add Person</button>

            <div class="form-row" id="contactContainer"><br>
                <h4 style="  margin-left: 2%;font-weight: 500;font-size: x-large;"> Contact Details:</h4>
                <hr />
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="contact">Contact Number</label>
                        <input type="text" class="form-control" name="contact" placeholder="Contact Number" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" name="email" placeholder="Email" required>
                    </div>
                </div>
            </div>

            <div class="form-row" id="ticketContainer"> <br><br><br><br>
                <h4 style=" margin-left: 2%;font-weight: 500;font-size: x-large;"> Ticket Details:</h4>
                <hr />

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="origin">Origin</label>
                        <input type="text" class="form-control" name="origin" placeholder="Origin" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="destination">Destination</label>
                        <input type="text" class="form-control" name="destination" placeholder="Destination" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="departure">Departure</label>
                        <input type="date" class="form-control" name="departure" placeholder="Departure" required>
                    </div>
                </div>
            </div>
            <button class="btn btn-success" style="margin:1% 2%; margin-bottom:4%">Book now</button>
        </form>
    </div>

    <div style="font-size: 16px;">
        <?php include 'footer.php'; ?>
    </div>

    <script>
        function addPerson() {
            // alert("hi");
            $("#personContainer").append($(".personBox").html())
        }
    </script>
</body>

</html>