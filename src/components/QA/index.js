import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { useQuery } from "@apollo/react-hooks"
import { LinearGradient } from "expo-linear-gradient"
import { Question, Options, Submit } from "./QuestionOptionsSubmit"
import {
    QA_QUERY,
    EVALUATAION_QUERY,
    RANK_PREDICTION_MUTATION
} from "../../gql/QA"
import { withNavigation } from 'react-navigation'




let fakingStateIndex = 0;

function QAComponent({ token, navigation }) {
    // const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
    const [answer, setAnswer] = React.useState(-1);
    const [score, setScore] = React.useState(0);
    const [recommendations, setRecommendations] = React.useState(() => new Set());

    const { loading: qaQueryLoading, error: qaQueryError, data: qaQueryData } = useQuery(QA_QUERY, {
        variables: { token },
    });


    React.useEffect(() => {
        console.log({ fakingStateIndex, score, recommendations })
    }, [score])

    function optionAction({ answerIndex, recommendation }, answer) {
        const length = qaQueryData.QA.length - 1;
        if (fakingStateIndex < length) {
            let newScore = -1;
            if (answer === answerIndex) {
                newScore = 4
            }
            setRecommendations(({ recommendations }) => ({
                recommendations: new Set(recommendations).add(recommendation)
            }));
            setScore((score + newScore))
            fakingStateIndex = fakingStateIndex + 1;
        }

    }


    function submitQuiz() {
        navigation.navigate("LeaderBoard", { score })
    }


    function renderQA() {
        if (!qaQueryLoading && !qaQueryError) {
            const {
                question,
                options,
                _id
            } = qaQueryData.QA[fakingStateIndex];

            return (
                <LinearGradient colors={["#fdfbfb", "#ebedee"]} style={{ flex: 1, padding: 20 }}>
                    <Question  {...{ question }} />
                    <Options {...{ _id, options, answer, optionAction }} />
                    {
                        fakingStateIndex === qaQueryData.QA.length - 1 && <Submit onPress={submitQuiz} title={"Submit Quiz!"} />

                    }
                </LinearGradient>
            )
        }
        return <View />
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

const mapStateToProps = ({ tokenReducer: token }) => ({ token })
export default withNavigation(connect(mapStateToProps)(QAComponent))