import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {useQuery} from "@apollo/react-hooks"
import {LinearGradient} from "expo-linear-gradient"
import {Question, Options, Submit} from "./QuestionOptionsSubmit"
import {
    QA_QUERY
} from "../../gql/QA"
import {withNavigation} from 'react-navigation'


let fakingStateIndex = 0;

function QAComponent({token, navigation}) {
    const [answer, setAnswer] = React.useState(-1);
    const [score, setScore] = React.useState(0);
    const [recommendations, setRecommendations] = React.useState(() => []);

    const {loading: qaQueryLoading, error: qaQueryError, data: qaQueryData} = useQuery(QA_QUERY, {
        variables: {token},
    });


    function optionAction({answerIndex, recommendation}, answer) {
        const length = qaQueryData.QA.length - 1;
        if (fakingStateIndex < length) {
            let newScore = -1;
            if (answer === answerIndex) {
                newScore = 4
            }
            setRecommendations([...recommendations, recommendation])
            setScore((score + newScore));
            fakingStateIndex = fakingStateIndex + 1;
        }

        if (fakingStateIndex === length) {
            alert("The revision test is complete  !!");
            navigation.navigate("LeaderBoard", {score: score * 180 / (length + 1), recommendations})
        }
    }

    function renderQA() {
        if (!qaQueryLoading && !qaQueryError) {
            const {
                question,
                options,
                _id
            } = qaQueryData.QA[fakingStateIndex];

            return (
                <LinearGradient colors={["#fdfbfb", "#ebedee"]} style={{flex: 1, padding: 20}}>
                    <Question  {...{question}} />
                    <Options {...{_id, options, fakingStateIndex, setAnswer}} optionAction={optionAction}/>
                </LinearGradient>
            )
        }
        return <View/>
    }

    return (
        <View style={[{
            flex: 1,
            justifyContent: "center",
        }]}>
            {qaQueryLoading && <Text> loading... </Text>}
            {qaQueryError && <Text>Error: {qaQueryError.message} </Text>}
            {renderQA()}
        </View>
    )
}

const mapStateToProps = ({tokenReducer: token}) => ({token})
export default withNavigation(connect(mapStateToProps)(QAComponent))

