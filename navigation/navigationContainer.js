import React, {useRef} from "react";
import MainNavigator, {EmailNavigator, SurveyNavigator} from "./mainNavigator";

const NavigationContainer = props => {
    const navRef = useRef();
    if (props.state.isLoading) {
        return <EmailNavigator ref={navRef}/>;
    } else if (props.state.userToken == null) {
        if (props.state.emailVerified) {
            return <MainNavigator ref={navRef}/>
        } else {
            return <EmailNavigator ref={navRef}/>;
        }
    } else {
        return <SurveyNavigator ref={navRef}/>;
    }
}
export default NavigationContainer;
