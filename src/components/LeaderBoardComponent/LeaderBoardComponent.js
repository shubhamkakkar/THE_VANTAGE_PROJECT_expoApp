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
        <View style={{flex: 1, padding: 10}}>
            <Text style={{marginBottom: 5, color: "red", fontSize: 18}}> Score: {score} </Text>
            <Text style={{marginBottom: 5, color: "red", fontSize: 18}}> Predicted rank: {userRank} </Text>
            <Text style={{textAlign: "center", marginBottom: 5, color: "red", fontSize: 18}}> Recommendations: </Text>
            {
                recommendationArray.map((res, key) => (
                    <View {...{key}} >
                        <Text style={{marginBottom: 5}}>{res}</Text>
                    </View>
                ))
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
            <View style={{flex: 1}}>
                <Heading title={"! Results !"} color={"white"}/>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={{
                flexGrow: 1, paddingVertical: 20,
                paddingHorizontal: 30
            }}>
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

    },
});


const mapStateToProps = ({tokenReducer: token}) => ({token});

export default connect(mapStateToProps)(LeaderBoardComponent)

