UI

customButton: Customised button component with color, shape, text alignment and size.

input: Reusable input class containing; text and dropdown menu stylings, gender options for drop down menu, dropdown menu interaction styling and regex control for email and zip code.
englishText: Class containing English text that is displayed in the app.

firebase: Firebase config class.

Navigation

mainNavigator: Responsible for navigation options. It contains three navigator stacks and MainNavigator. Each navigation stacks are responsible for their internal navigation and MainNavigator is responsible for the navigation between navigation stacks. EmailNavigatorStack consists of EmailValidationScreen and SplashScreen, SignUpNavigatorStack consists of SignUpScreen and SurveyNavigatorStack consists of StartSurveyScreen, SurveyScreen, SurveyDetailScreen and FinishScreen.

navigationContainer: Contains navigation logic. If user opened the app first time it navigates to emailValidationScreen. If app is opened through dynamic link and there is no user token present it navigates to signUpScreen. If app is opened and user token is present it navigates to startScreen.
Screens

emailValidationScreen: Screen responsible for Email validation and its UI. Checks if the user input is a valid email format, if email format is valid it sends validation email to user and redirects to splash screen.

finishScreen: Screen responsible for Finish screen and its UI. It contains local push notification logic that sends custom push message to user after 22 to 26 hours of pressing finish button. It navigates to top of SurveyNavigation stack.

signUpScreen: Screen responsible for getting user data and its UI. Stores values for age, gender and zip code. Displays error messages under input fields. If there are no errors in fields, it triggers create user event and navigates to start screen.

splashScreen: Screen responsible to display splash text to inform user that the email is sent.

startScreen: Screen responsible to display button to start survey. It triggers navigation to survey screen.

surveyDetailScreen: Screen responsible for detail question for survey and its UI. After button press it stores value of the button, time it got pressed. Answer options are displayed according to data passed from modal pop up in survey screen. It also gets previous data from survey screen and passes it together with its data to create survey entry in firebase realtime database.

surveyScreen:Screen responsible for the first question and modal pop up and its UI. After button press it stores buttons value and triggers modal pop up for additional information. It triggers navigation for survey detail screen and passes survey and modal data.
Actions

survey: Responsible for generating unique id for survey entry. It also contains method for passing id, age, gender, zip code, date and survey data to firebase for entry generation. It gets user information from async storage.
User

models/user: Constructor class for User containing id, age, gender and zip code.

actions/user: Generates unique id for user. Creates user token that contains id, age, gender and zip code and saves it to async storage.

reducers/user: Class made for managing states for user.
App: Contains logic for dynamic link and token usage. If app is opened through email link it passes that info to navigationContainer to open signUpScreen. It also checks if there is any user token is generated and passes that info to navigationContainer.

index: Contains configuration for local push notification.

