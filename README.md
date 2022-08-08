# Secret Santa Emailer

Located on http://jackscallan.com, users can input user and email information and submit it, which will randomly pair each person with another person. The purpose of this project is to use for my family who partakes in the "Secret Santa" tradition every Christmas.

### The Algorithm
Upon submission of the user information, users get randomly paired with eachother via an algorithm made in Javascript. The algorithm takes in two 2D arrays as the input, where each item is a `name, email` pair corresponding to each person. Then, it returns a hashmap of every person mapped to the destination email and their paired name.

### The client-server interaction
Next, the pairings returned by the algorithm are sent to the server in a JSON format. They are sent as strings using an HTTP request and parsed by the server in a PHP script. Then, using SMTP credentials, the PHP script sends each respective user an email using the Amazon Web Services Simple Email Service (AWS SES).

Finally, the user is informed if the emails were sent successfully, or if there was an invalid email address.


### Preview
![Alt Text](http://recordit.co/ofi1r7MfLn)
<img src="http://recordit.co/ofi1r7MfLn" width="40" height="40"/>
