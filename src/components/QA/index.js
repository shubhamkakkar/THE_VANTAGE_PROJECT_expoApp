import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import Question from "./Question/Question"
import Options from './Options/Options'

import {
    QA_QUERY,
    EVALUTAION_QUERY,
    RANK_PREDICTION_MUTATION
} from "../../gql/QA"


function Submit({ onPress, title }) {
    return (
        <View />
    )
}



function QAComponent({ token }) {
    const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
    const [answer, setAnswer] = React.useState(-1);
    const [score, setScore] = React.useState(0);

    const { loading, error, data: qaData } = useQuery(QA_QUERY, {
        variables: { token },
    });



    if (!loading && !error) {
        console.log({ qaData })
    }


    const {
        question,
        options,
    } = questionsAndAnswers[activeQuestionIndex];
    function onPress() { }
    return (
        <View style={[{
            flex: 1,
            justifyContent: "center",
            padding: 20,
        }]}>
            <Question  {...{ question }} />
            <Options {...{ answer, setAnswer }} />
            {
                activeQuestionIndex < questionsAndAnswers.length - 1
                    ? <Submit {...{ onPress }} />
                    : <Submit onPress={submitQuiz} title={"Submit Quiz!"} />
            }
        </View>
    )
}
const mapStateToProps = ({ tokenReducer: token }) => ({ token })
export default connect(mapStateToProps)(QAComponent)