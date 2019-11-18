import React from "react"
import {ScrollView, View, StyleSheet, Text, ActivityIndicator} from "react-native";
import {LinearGradient} from "expo-linear-gradient"
import Constants from "expo-constants";
import {Heading} from "../../UI";
import {RANK_PREDICTION_MUTATION} from "../../gql/QA"
import {useMutation} from "@apollo/react-hooks";
import {connect} from "react-redux"


function ScoreCard({userRank, score, recommendations}) {
    function union(setA, setB) {
        let _union = new Set(setA);
        for (let elem of setB) {
            _union.add(elem);
        }
        return _union;
    }

    const recommendationArray = [...union(recommendations, recommendations)];
    return (
        <View style={{flex: 1}}>
            <Text> score: {score} </Text>
            <Text> rank: {userRank} </Text>
            {
                recommendationArray.map(res => <Text>{res}</Text>)
            }
        </View>
    )
}


function LeaderBoardComponent({recommendations, score, token}) {
    const [userRank, setRank] = React.useState("")
    const [rankPredictionMutation] = useMutation(RANK_PREDICTION_MUTATION);
    React.useEffect(() => {
        rankPredictionMutation({variables: {marks: score, token}})
            .then(({data: {rankPrediction: {rank}}}) => {
                setRank(rank)
            })
            .catch(er => {
                console.log("laaderboard component", {er})
            });
    }, []);

    return (
        <LinearGradient style={{flex: 1, marginTop: Constants.statusBarHeight,}} colors={["#667eea", "#764ba2"]}>
            <Heading title={"! Results !"} color={"white"}/>
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                {
                    userRank.trim().length
                        ? <ScoreCard {...{userRank, score, recommendations}} />
                        : <ActivityIndicator/>

                }
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
});


const mapStateToProps = ({tokenReducer: token}) => ({token});

export default connect(mapStateToProps)(LeaderBoardComponent)

