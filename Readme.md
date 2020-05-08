Tech Stack Used :  Object Oriented TypeScript, NodeJs, Webpack [for bundling], Jest [for unit/integration testing]

Points to follow : 

1. Open Terminal.
2. Go to parking_lot directory
3 . Run command bin/setup [please make sure you are using sudo su - or su - if needed]
This will create a build folder parallel to bin folder and run unit/integration tests.

* sudo su - (in ubuntu machine) or su - (in case of docker, where sudo package not available) 
** For Docker, docker file is made inside parking_lot parallel to bin folder, kindly use it
*** In case of any unknown errors the setup file contains all necessary commands and respective comments, please use them directly.
**** File input test case is little modified as it was not reading text from test case file "fixtures/file_inut.txt"
*****Integration and unit test are written inside test folder