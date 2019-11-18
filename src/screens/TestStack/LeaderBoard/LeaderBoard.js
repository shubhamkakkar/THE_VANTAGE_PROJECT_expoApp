import React from "react";
import LeaderBoardComponent from '../../../components/LeaderBoardComponent/LeaderBoardComponent'

export default class LeaderBoard extends React.PureComponent {
    render() {
        const score = this.props.navigation.getParam("score");
        const recommendations = this.props.navigation.getParam("recommendations");

        return <LeaderBoardComponent {...{score, recommendations}}/>

    }
}
