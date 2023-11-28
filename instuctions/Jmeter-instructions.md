# Downloading and running JMeter

> Download Jmeter from this link: https://jmeter.apache.org/download_jmeter.cgi (or any way, as long as you have Jmeter installed)       
> Open the terminal       
> Type: cd /path/to/JMeter/apache-jmeter-5.6.2/bin (note that your version type may be different)             
> To open the JMeter user interface, Type: sh jmeter.sh      
> And JMeter should be open         

> Open and run Dev Diaries in localhost, using port 3000 (This will be automatic if you are using the docker image)         
> Use the following credential to login:        
> email: new@1       
> password: 1 (I know, not a very strong passsword)

> Now you can run load testing on the system.       
> Download the latest version of the LoadTesting.jmx file from the main project page       
> This file contains a thread group, with HTTP requests for both GET and POST methods                
> To view the results of the load test, click on the "View Results Tree" tab      
> You will see a green check next to any tests that passed, and a red x next to any tests that have failed       
> We are testing our system for the capacity requirement of responding to 20 users with a total of 200 requests per minute concurrently
      
