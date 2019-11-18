import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { LinearGradient } from "expo-linear-gradient"
import { Question, Options, Submit } from "./QuestionOptionsSubmit"
import {
    QA_QUERY,
    EVALUATAION_QUERY,
    RANK_PREDICTION_MUTATION
} from "../../gql/QA"





function QAComponent({ token }) {
    const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
    const [answer, setAnswer] = React.useState(-1);
    const [score, setScore] = React.useState(0);

    const { loading: qaQueryLoading, error: qaQueryError, data: qaQueryData } = useQuery(QA_QUERY, {
        variables: { token },
    });

    const [evaluationQuery, { loading: evaluationQueryLoading, error: evaluationQueryError, data: evaluationQueryData }] = useLazyQuery(EVALUATAION_QUERY, {
        variables: { _id, index }
    })


    function optionAction({ _id, statedAnswerIndex }) {
        evaluationQuery({ variables: { _id, statedAnswerIndex } })

        if (!evaluationQueryLoading && !evaluationQueryError) {
            if (evaluationQueryData) {
                console.log({ evaluationQueryData })
                setActiveQuestionIndex(statedAnswerIndex + 1);
            }

        }


        function onPress() { }


        function renderQA() {
            if (!qaQueryLoading && !qaQueryError) {
                const {
                    question,
                    options,
                    _id
                } = qaQueryData.QA[activeQuestionIndex];

                return (
                    <LinearGradient colors={["#fdfbfb", "#ebedee"]} style={{ flex: 1, padding: 20 }}>
                        <Question  {...{ question }} />
                        <Options {...{ _id, options, answer, optionAction }} />
                        {
                            activeQuestionIndex < qaQueryData.QA.length - 1
                                ? <Submit {...{ onPress }} title={"->"} />
                                : <Submit onPress={submitQuiz} title={"Submit Quiz!"} />
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

}

const mapStateToProps = ({ tokenReducer: token }) => ({ token })
export default connect(mapStateToProps)(QAComponent)