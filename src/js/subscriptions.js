import qs from 'qs'
import axios from 'axios'

function getSubscriptionRelation(targetUserId){
    console.log("targetUserId from function [getSubscriptionRelation]")
    console.log(targetUserId)
    return new Promise((res, rej) => {
        // gather user token
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        // send request
        let queryData = {
            "targetUserId": targetUserId
        }
        let returnValue = {
            "status": false,
            "data": undefined
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            url: "/api/relation/getSingleSubscription",
            data: qs.stringify(queryData)
        }).then(data => {
            if (data.data.Code != 200){
                returnValue.status = false
            }
            returnValue.status = true
            returnValue.data = data.data.Data
            console.log("returnValue in function")
            console.log(returnValue)
            res(returnValue)
        }).catch(err => {
            console.log(err)
            returnValue.status = false
            res(returnValue)
        })

        //. res(returnValue)
    })
}

function addSubscription (id){
    return new Promise((res, rej) => {
        console.log("The ID of the user is:")
        console.log(id)
        // gather user token
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        // send the request and receive the data
        let sendData = {
            "targetUserId": id
        }
        let result = false
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            url: "/api/relation/add",
            data: qs.stringify(sendData)
        }).then(data => {
            if (data.data.Code == 200){
                result = true 
            }
            else{
                result = false
            }
            res(result)
        }).catch(err => {
            console.log(err)
            result = false
            res(result)
        })
    })
}

function removeSubscription (id) {
    // The id is the targetUserId
    return new Promise((res, rej) => {
        // gather the user token from the local
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        // prepare and send 
        let sendData = {
            "targetUserId": id
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            data: qs.stringify(sendData),
            url: "/api/relation/delete"
        }).then(data => {
            // verify the process from the server
            if (data.data.Data.ErrCode == "success"){
                res(true)
            }
            else{
                console.log("Error from remove subscription")
                res(false)
            }
        }).catch(err => {
            console.log(err)
            res(false)
        })
    })
}

function getUserFollowingList (id){
    return new Promise((res, rej) => {
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        let Senddata = {
            "targetId": id
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            data: qs.stringify(Senddata),
            url: "/api/relation/getSubscriptions"
        }).then(data => {
            console.log("Result of following list: ", data.data.Data)
            if (data.data.Code == 200) {
                res(data.data.Data)
            }
            else{
                res([])
            }
        }).catch(err => {
            console.log(err)
            res([])
        })
    })
}

export default{
    addSubscription,
    getSubscriptionRelation,
    removeSubscription,
    getUserFollowingList,
}