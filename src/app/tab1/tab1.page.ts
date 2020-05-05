import { LeaderboardPageRoutingModule } from './../leaderboard/leaderboard-routing.module';
import { Component, OnInit} from '@angular/core';
import { ProfileService } from './../services/user/profile.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  public userPoints:number;
  public userProfile: any;
  public team: string;
  public hideTeamProgressBar: boolean;
  public teamProgressBar: number;
  public uid: string;
  public cityTotalPledgeCount: number;
  public cityUserNumber: number;
  public cityProgressBar: number;
  public teamPledgeCount: number;
  public teamUsers: number;
  public totalPledgesPossiblePerUser: number;
  public userProgressBar: number;
  public teamAccessCode: string;
  public teamTotalPoundsCarbon: number;
  public teamPoints: number;
  public teamTotalPledgeCount: number;
  public cityTotalPoundsCarbon: number;
  public hidePersonalProgress: boolean = true;
  public EdPoints: Array<Number>;
  public PLPoints: Array<Number>;
  public CompPoints: Array<Number>;
  public ARPoints: Array<Number>;
  public TPoints: Array<Number>;
  public HCPoints: Array<Number>;
  public PLPounds: Array<Number>;
  public CompPounds: Array<Number>;
  public ARPounds: Array<Number>;
  public TPounds: Array<Number>;
  public HCPounds: Array<Number>;
  public userTotalPoundsCarbon: number;
  public hasStarted: boolean;
  public hasNotStarted: boolean;
  public try: number; 
  public userPledgeCount: number;
  public lifetimeUserPoints: number;
  public hideJoinTeamText: boolean;
  constructor(private profileService: ProfileService) {}


ngOnInit() {

  var user = firebase.auth().currentUser;     //Get User ID
  if (user != null) {
    this.uid = user.uid; 
  }

  this.hasUserStartedModules();         //Check if User has Started the Modules
  this.doesUserHaveTeam();              //Check if User Has a Team and get team info
  this.cityProgressBarTotals();

}

retrieveTotalUsers(){
  let n = firebase.firestore().collection('userProfile').get().then( collection =>{
    let count = 0
    collection.forEach( doc=>{
      count+=1;
    })
    console.log(count);
    return count;
  });
}

hasUserStartedModules() {    //Check to see if user has started any modules.
  const checkStart = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('education').get().then((edSnap)=>{  
    if (edSnap.exists){                   //does the very first pledge exist in their database? if so, it will show personal progress.
      this.hidePersonalProgress = false;    //show the user's progress bar
      this.hasNotStarted = true;            //Hide the text inviting the user to start the module.
    
      this.updateUserPoundsPointsAndPledgeTotals()

    } else {
      this.hasNotStarted =false;    //show the text inviting the user to start the modules.
    }
  })
}

doesUserHaveTeam(){
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let getTeam = userRef.get().then(user => {
    if (user.data().team != undefined){
      this.hideTeamProgressBar = false;
      this.team = user.data().team
      
      this.teamProgressBarTotals(this.team);
      //this.updateTotalTeamPledgesComplete();
      this.getTeamData(this.team);
      this.hideJoinTeamText = true;
    
      //this.updateTotalTeamPledgesComplete();
      //this.getUserandTeamData();
      this.hideJoinTeamText = true;
      
    } else{
      this.hideTeamProgressBar = true;
      this.cityProgressBarTotals();
      this.hideJoinTeamText = false;
    }
  })
}

getTeamData(team:string){
      let teamPointsSearch = firebase.firestore().collection('teams').doc(`${team}`).get().then((docSnapshot)=>{
        this.teamAccessCode = String(docSnapshot.data().accessCode);
        this.teamTotalPoundsCarbon = Number(docSnapshot.data().totalPoundsCarbon);
      })
}

getUserData(){        
  this.profileService.getUserProfile().then((userProfileSnapshot) => {    //Get team from user profile and store in public variables to display on page
    if (userProfileSnapshot.data()) {
      this.userPoints = Number(userProfileSnapshot.data().points);
    }
    else{
      this.userPoints = 0;
      this.teamTotalPoundsCarbon = 0;
    }
  })
  const getCityInfo = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then( (citySnap) =>{
    this.cityTotalPoundsCarbon = Number(citySnap.data().totalPoundsCarbon)
  })
}

teamBool(){
  var team = false;
  return team;
}

updateEdPledgeComplete(edPledgeComplete: number){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education'); 
  console.log("from inside the function: Ed pledge complete = ", edPledgeComplete);
  let newEdPledgeComplete = {
    edPledgeComplete: `${edPledgeComplete}`
  }
  let updateEdPledge = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(newEdPledgeComplete);

  let edCounted = approvalRef.get().then(edSnap=>{
    var teamCounted = Number(edSnap.data().teamPledgesCounted);
    var cityCounted = Number(edSnap.data().cityPledgesCounted);
    let edDiffTeam = edPledgeComplete-teamCounted;
    let edDiffCity = edPledgeComplete-cityCounted;

  })
}

updateTotalUserPledgesComplete(){
  
  let user = firebase.firestore().collection('userProfile').doc(`${this.uid}`).get().then(user =>{
    var ed = 0;
    var pl = 0;
    var c = 0;
    var l = 0; 
    var ar = 0; 
    var hc = 0;
    var t = 0; 
    if (user.data().edPledgeComplete != undefined){
      ed = Number(user.data().edPledgeComplete);
    }
    if (user.data().plPledgeComplete != undefined){
      pl = Number(user.data().plPledgeComplete);
    }
    if (user.data().cPledgeComplete != undefined){
      c = Number(user.data().cPledgeComplete);
    }
    if (user.data().arPledgeComplete != undefined){
      ar = Number(user.data().arPledgeComplete);
    }
    if (user.data().hcPledgeComplete != undefined){
      hc = Number(user.data().hcPledgeComplete);
    }
    if (user.data().tPledgeComplete != undefined){
      t = Number(user.data().tPledgeComplete);
    }
    if (user.data().lPledgeComplete != undefined){
      l = Number(user.data().lPledgeComplete);
    }
    let total = ed + pl + c + hc + l + ar + t;
    let newTotal = {
      totalPledgesComplete: `${total}`
    }
     let update = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(newTotal);
  
  })
}

updateTotalTeamPledgesComplete(){
  let user = firebase.firestore().collection('userProfile').doc(`${this.uid}`).get().then(user =>{
    var team = String(user.data().team);
    let teamInfo = firebase.firestore().collection('teams').doc(`${team}`).get().then(snap =>{
   
    var ed = 0;
    var pl = 0;
    var c = 0;
    var l = 0; 
    var ar = 0; 
    var hc = 0;
    var t = 0; 
    if (snap.data().edPledgeComplete != undefined){
      ed = Number(snap.data().edPledgeComplete);
    }
    if (snap.data().plPledgeComplete != undefined){
      pl = Number(snap.data().plPledgeComplete);
    }
    if (snap.data().cPledgeComplete != undefined){
      c = Number(snap.data().cPledgeComplete);
    }
    if (snap.data().arPledgeComplete != undefined){
      ar = Number(snap.data().arPledgeComplete);
    }
    if (snap.data().hcPledgeComplete != undefined){
      hc = Number(snap.data().hcPledgeComplete);
    }
    if (snap.data().tPledgeComplete != undefined){
      t = Number(snap.data().tPledgeComplete);
    }
    if (snap.data().lPledgeComplete != undefined){
      l = Number(snap.data().lPledgeComplete);
    }
    let total = ed + pl + c + hc + l + ar + t;
    let newTotal = {
      totalPledgesComplete: `${total}`
    }
     let update = firebase.firestore().collection('teams').doc(`${team}`).update(newTotal);
    })
  })
} 

//NEED THIS ONE. Populates City Progress Bar and lbs carbon
cityProgressBarTotals(){

  //__________________________________Get City info for city progress bar
  var count = 0;

  let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
    let cityUserCount = firebase.firestore().collection('userProfile').get().then(snap =>{
      snap.forEach(doc =>{
        count +=1;
      })

      console.log(count);
      this.cityTotalPledgeCount = Number(docSnapshot.data().totalPledgesComplete);
      this.cityUserNumber = count;
      var possible = Number(docSnapshot.data().totalPossiblePledgesPerUser);
      var totalCityPledges = possible*Number(this.cityUserNumber);
      this.cityProgressBar = Number((Number(this.cityTotalPledgeCount)/totalCityPledges)*100);
      this.cityTotalPoundsCarbon = Number(docSnapshot.data().totalPoundsCarbon);
      console.log(this.cityUserNumber);
    })
  })
}

//Populates team progress bar
teamProgressBarTotals(team:string){
  //__________________________________Get team info for team progress bar
  let getTeamInfo = firebase.firestore().collection('teams').doc(`${team}`).get().then((docSnapshot)=>{
  this.teamPoints = Number(docSnapshot.data().teamPoints);
  this.teamTotalPledgeCount = Number(docSnapshot.data().totalPledgesComplete);
  this.teamUsers = Number(docSnapshot.data().teamUsers);

  let getTotalPledges = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then(snap=>{
    this.totalPledgesPossiblePerUser = Number(snap.data().totalPossiblePledgesPerUser);

    var totalTeamPledges = Number(this.totalPledgesPossiblePerUser)*Number(this.teamUsers);
    this.teamProgressBar = Number((this.teamTotalPledgeCount)/totalTeamPledges)*100;

  })
  })
}  


//Might not need this function at all
randomFunctionToGetUserInfoAndPoints(){
  //_________________________Get User Info and Update User Points_________________
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let getUser = userRef.get().then(doc=>{
      var userPoints = doc.data().points;
      let newIndiPoints = Number(userPoints) + 100;   //Update with correct points
      let newPointsIndi = {
        points: `${newIndiPoints}`
      }
      let updateIndiPoints = userRef.update(newPointsIndi);
  })
}


updateUserPoundsPointsAndPledgeTotals(){
  const edPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('education'); 
  const plPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('plug-loads'); 
  const cPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('computer'); 
  const hcPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('heatingAndCooling'); 
  const arPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('appliancesAndRecycling'); 
  const tPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('transportation'); 
  const lPointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('lighting'); 

  const edPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('education'); 
  const plPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('plug-loads'); 
  const cPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('computer'); 
  const hcPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('heatingAndCooling'); 
  const arPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('appliancesAndRecycling'); 
  const tPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('transportation'); 
  const lPoundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('lighting'); 

  const edApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education'); 
  const plApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('plug-loads'); 
  const cApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('computer'); 
  const hcApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('heatingAndCooling'); 
  const arApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('appliancesAndRecycling'); 
  const tApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('transportation'); 
  const lApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('lighting'); 

  let points = 0;
  let pledgesComplete = 0;
  let poundsCarbon = 0

  let checkEdApproved = edApprovalRef.get().then(doc =>{
    let totalPledges = 0;
    let edPledgeComplete = 0;
    if(doc.exists){
    let edArray = [doc.data().ed1, doc.data().ed2, doc.data().ed3, doc.data().ed4, doc.data().ed5];
    let edPointsPossible = [100, 100, 200, 100, 250];
    let edPoundsPossible = [0, 0, 0, 0, 0];
    let edPointsArray = [];
    let edPoundsArray = [];
    totalPledges += edArray.length;
    for(let n = 0; n<edArray.length; n++){
      if (edArray[n] == "approved"){
        pledgesComplete+=1;
        points += edPointsPossible[n];
        poundsCarbon += edPoundsPossible[n];
        edPointsArray.push(edPointsPossible[n]);
        edPoundsArray.push(edPoundsPossible[n]);
        edPledgeComplete += 1;
      } else{
        edPointsArray.push(0);
        edPoundsArray.push(0);
      }
    }
    console.log("edPledgeComplete: ", edPledgeComplete);
  
        //update education information in database.
      if(edPledgeComplete > 0){
        this.updateEdPledgeComplete(edPledgeComplete);      //Update edPledgeComplete in user profile
        this.updateUserEdPoints(edPointsArray);             //Update user edPoints
        this.updateCityEdPoundsFromUserData(edPoundsArray);
        this.updateCityEdPledgesFromUserData(edPledgeComplete);
      }   
    }
    
      let checkPlApproved = plApprovalRef.get().then(doc =>{
        let plPledgeComplete = 0;
        if(doc.exists){
        let plArray = [doc.data().pl1, doc.data().pl2, doc.data().pl3, doc.data().pl4, doc.data().pl5, doc.data().pl6];
        let plPointsPossible = [70, 120, 50, 1650, 120, 160];
        let plPoundsPossible = [70, 120, 50, 1650, 120, 160];
        let plPointsArray = [];
        let plPoundsArray = [];
        totalPledges += plArray.length;
        for(let n = 0; n<plArray.length; n++){
          if (plArray[n] == "approved"){
            pledgesComplete+=1;
            points += plPointsPossible[n];
            poundsCarbon += plPoundsPossible[n];
            plPointsArray.push(plPointsPossible[n]);
            plPoundsArray.push(plPoundsPossible[n]);
            plPledgeComplete+=1;
          } else{
            plPointsArray.push(0);
            plPoundsArray.push(0);
          }
        }
      }

          let checkLApproved = lApprovalRef.get().then(doc =>{
            if(doc.exists){
            let lArray = [doc.data().l1, doc.data().l2, doc.data().l3];
            let lPointsPossible = [240, 90, 160];
            let lPoundsPossible = [240, 90, 160];
            let lPointsArray = [];
            let lPoundsArray = [];
            totalPledges += lArray.length;
            for(let n = 0; n<lArray.length; n++){
              if (lArray[n] == "approved"){
                pledgesComplete+=1;
                points += lPointsPossible[n];
                poundsCarbon += lPoundsPossible[n];
                lPointsArray.push(lPointsPossible[n]);
                lPoundsArray.push(lPoundsPossible[n]);
              } else {
                lPointsArray.push(0);
                lPoundsArray.push(0);
              }
            }
          }

              let checkCApproval = cApprovalRef.get().then(doc =>{
                if(doc.exists){
                let cArray = [doc.data().c1, doc.data().c2, doc.data().c3];
                let cPointsPossible = [100, 500, 200];
                let cPoundsPossible = [100, 500, 200];
                let cPointsArray = [];
                let cPoundsArray = [];
                totalPledges += cArray.length;
                for(let n = 0; n<cArray.length; n++){
                  if (cArray[n] == "approved"){
                    pledgesComplete+=1;
                    points += cPointsPossible[n];
                    poundsCarbon += cPoundsPossible[n];
                    cPointsArray.push(cPointsPossible[n]);
                    cPoundsArray.push(cPoundsPossible[n]);
                  } else {
                    cPointsArray.push(0);
                    cPoundsArray.push(0);
                  } 
                }
              }
                 
                  let checkARApproval = arApprovalRef.get().then(doc =>{
                    if(doc.exists){
                    let arArray = [doc.data().ar1, doc.data().ar2, doc.data().ar3, doc.data().ar4, doc.data().ar5];
                    let arPointsPossible = [370, 150, 120, 1030, 260];
                    let arPoundsPossible = [370, 150, 120, 1030, 260];
                    let arPointsArray = [];
                    let arPoundsArray = [];
                    totalPledges += arArray.length;
                    for(let n = 0; n<arArray.length; n++){
                      if (arArray[n] == "approved"){
                        pledgesComplete+=1;
                        points += arPointsPossible[n];
                        poundsCarbon += arPoundsPossible[n];
                        arPointsArray.push(arPointsPossible[n]);
                        arPoundsArray.push(arPoundsPossible[n]);
                      } else {
                        arPointsArray.push(0);
                        arPoundsArray.push(0);
                      } 
                      } 
                    }

                      let checkTApproval = tApprovalRef.get().then(doc =>{
                        if(doc.exists){
                        let tArray = [doc.data().t1, doc.data().t2, doc.data().t3, doc.data().t4, doc.data().t5, doc.data().t6, doc.data().t7, doc.data().t8];
                        let tPointsPossible = [730, 830, 300, 800, 590, 40, 20, 220, 660];
                        let tPoundsPossible = [730, 830, 0, 11800, 590, 40, 20, 220, 660];
                        let tPointsArray = [];
                        let tPoundsArray = [];
                        totalPledges += tArray.length;
                        for(let n = 0; n<tArray.length; n++){
                          if (tArray[n] == "approved"){
                            pledgesComplete+=1;
                            points += tPointsPossible[n];
                            poundsCarbon += tPoundsPossible[n];
                            tPointsArray.push(tPointsPossible[n]);
                            tPoundsArray.push(tPoundsPossible[n]);
                          } else {
                            tPointsArray.push(0);
                            tPoundsArray.push(0);
                          } 
                          }
                        }

                              let checkHCApproval = hcApprovalRef.get().then(doc =>{
                                if(doc.exists){
                                let hcArray = [doc.data().hc1, doc.data().hc2, doc.data().hc3, doc.data().hc4, doc.data().hc5, doc.data().hc6];
                                let hcPointsPossible = [800, 590, 40, 20, 220, 660];
                                let hcPoundsPossible = [800, 590, 40, 20, 220, 660];
                                let hcPointsArray = [];
                                let hcPoundsArray = [];
                                totalPledges += hcArray.length;
                                for(let n = 0; n<hcArray.length; n++){
                                  if (hcArray[n] == "approved"){
                                    pledgesComplete+=1;
                                    points += hcPointsPossible[n];
                                    poundsCarbon += hcPoundsPossible[n];
                                    hcPointsArray.push(hcPointsPossible[n]);
                                    hcPoundsArray.push(hcPoundsPossible[n]);
                                  } else {
                                    hcPointsArray.push(0);
                                    hcPoundsArray.push(0);
                                  }
                                  } 
                                }
                                this.lifetimeUserPoints = points;
                                this.userTotalPoundsCarbon = poundsCarbon;                              
                                this.userPledgeCount = (pledgesComplete/totalPledges)*100;
                              })
                          })
                          })
                      })   
              })    
      })
   })
}

updateUserEdPoints(edPointsArray: Array<string>){
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('education');
  console.log(edPointsArray);
  let newUserPoints = {
    ed1: `${Number(edPointsArray[0])}`,
    ed2: `${Number(edPointsArray[1])}`,
    ed3: `${Number(edPointsArray[2])}`,
    ed4: `${Number(edPointsArray[3])}`,
    ed5: `${Number(edPointsArray[4])}`
  }
  let updateDBPoints = pointsRef.update(newUserPoints);

}
  
updateUserEdPounds(edPoundsArray: Array<number>){
  const poundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('education');
  let newUserPounds = {
    ed1: `${Number(edPoundsArray[0])}`,
    ed2: `${Number(edPoundsArray[1])}`,
    ed3: `${Number(edPoundsArray[2])}`,
    ed4: `${Number(edPoundsArray[3])}`,
    ed5: `${Number(edPoundsArray[4])}`
  }
    let updateDBPounds = poundsRef.update(newUserPounds);
    this.updateTeamEdPounds();
}

updateCityEdPoundsFromUserData(edPoundsArray: Array<number>){
  let pounds = 0;
  for(let n = 0; n<edPoundsArray.length; n++){
    pounds += edPoundsArray[n];
  }
  const poundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('education');
  
  let viewCountedPounds = poundsRef.get().then( poundsSnap => {
    let countedPounds = Number(poundsSnap.data().cityPoundsCounted);
    let diffPounds = countedPounds - pounds
    if(diffPounds>0){
      let cityPoundsCheck = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then(citySnap=>{
        let cityPounds = Number(citySnap.data().totalPoundsCarbon)
        let newPounds = cityPounds + diffPounds;
        let newPoundsUpdate = {
          totalPoundsCarbon:`${newPounds}`
        }
        let newCountedPounds = {
          cityPoundsCounted:`${pounds}`
        }
        let updateCity = firebase.firestore().collection('cityOverall').doc('cityOverall').update(newPoundsUpdate);
        let updateUser = poundsRef.update(newCountedPounds);
      })
    }
  })

}

updateCityEdPledgesFromUserData(pledges: number){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education');
  let viewCountedPledges = approvalRef.get().then( pledgeSnap => {
    let countedPledges = Number(pledgeSnap.data().cityPledgesCounted);
    let diffPledges = countedPledges - pledges
    if(diffPledges>0){
      let cityPledgeCheck = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then(citySnap=>{
        let cityEdPledges = Number(citySnap.data().totalEdPledgeComplete);
        let cityPledges = Number(citySnap.data().totalPledgesComplete)
        let newEdPledge = cityEdPledges + diffPledges;
        let newPoundsUpdate = {
          totalEdPledgeComplete:`${newEdPledge}`
        }
        let newCountedPounds = {
          cityPledgesCounted:`${pledges}`
        }
        let updateCity = firebase.firestore().collection('cityOverall').doc('cityOverall').update(newPoundsUpdate);
        let updateUser = approvalRef.update(newCountedPounds);
        console.log("from inside the function, edPledge to City:", newEdPledge);
        console.log("diffPledges: ", diffPledges);
        console.log("pledges ", pledges);

      })
    }
  })
}



updateTeamEdPounds(){
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  const poundsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pounds').doc('education');
  
  let getUserInfo = userRef.get().then(userSnap =>{
    this.team = String(userSnap.data().team);

    const teamRef = firebase.firestore().collection('teams').doc(`${this.team}`);

    let getUserPoundContributions = poundsRef.get().then(poundSnap =>{
      var userPoundTeamCount = Number(poundSnap.data().teamPoundsCounted);
      var userPoundCityCount = Number(poundSnap.data().cityPoundsCounted);
      var poundsArray = []
      poundsArray.push(Number(poundSnap.data().ed1),
                      Number(poundSnap.data().ed2),
                      Number(poundSnap.data().ed3),
                      Number(poundSnap.data().ed4),
                      Number(poundSnap.data().ed5))
      var poundsSum = 0
      for(let n = 0; n<poundsArray.length; n++){
        poundsSum += poundsArray[n];
      }
      var newPounds = Number(userPoundTeamCount) - Number(poundsSum);

      let getTeamInfo = teamRef.get().then(teamSnap =>{

        let teamPounds = Number(teamSnap.data().totalPoundsCarbon);
        let newPoundContribution = teamPounds + newPounds;
        let pounds = {
          totalPounds: `${newPoundContribution}`
        }

        let updateTeamPounds = teamRef.update(pounds);

      })
    })
  })
}

updateTeamEdPledges(){
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  const pledgesRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('education');
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education');
  
  let getUserInfo = userRef.get().then(userSnap =>{
    this.team = String(userSnap.data().team);

    const teamRef = firebase.firestore().collection('teams').doc(`${this.team}`);

    let getUserPledgeContributions = pledgesRef.get().then(pledgeSnap =>{
      var userPledgeTeamCount = Number(pledgeSnap.data().teamPledgesCounted);
      var userPledgeCityCount = Number(pledgeSnap.data().cityPledgesCounted);
      
      let getApprovalStatus = approvalRef.get().then(approvalSnap =>{
      var approvedArray = []
      approvedArray.push(String(approvalSnap.data().ed1),
                        String(approvalSnap.data().ed2),
                        String(approvalSnap.data().ed3),
                        String(approvalSnap.data().ed4),
                        String(approvalSnap.data().ed5))
      var pledgeCount = 0
      for(let n = 0; n<approvedArray.length; n++){
        if(approvedArray[n] == 'approved'){
          pledgeCount +=1;
        }
      }
      var newPledges = Number(pledgeCount) - Number(userPledgeTeamCount);
      if (newPledges > 0){
        let getTeamInfo = teamRef.get().then(teamSnap =>{

          let teamPledges = Number(teamSnap.data().edPledgeComplete);
          let newPledgeContribution = teamPledges + newPledges;
          let pledge = {
            edPledgeComplete: `${newPledgeContribution}`
          }
          let updateTeamPounds = teamRef.update(pledge);

          let ed = {
            teamPledgesCounted: `${pledgeCount}`
          }

          let updateCounted = pledgesRef.update(ed);
        
        })
        }
      })
    })
  })
}



updatePLPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('plug-loads');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('plug-loads');
  
  let checkPLApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let plStatusArray = []
    plStatusArray.push(String(docSnapshot.data().pl1), 
                       String(docSnapshot.data().pl2), 
                       String(docSnapshot.data().pl3), 
                       String(docSnapshot.data().pl4), 
                       String(docSnapshot.data().pl5),
                       String(docSnapshot.data().pl6))
    let plPointsArray = [70, 120, 50, 1650, 120, 160]
    let userPointsArray = []
    for(let n =0; n<plStatusArray.length; n++){
      if(plStatusArray[n] == "approved"){
        userPointsArray.push(Number(plPointsArray[n]));
      } else {
        userPointsArray.push(0);
      }
    }
    this.PLPoints = userPointsArray;
    this.PLPounds =  userPointsArray;
    let newUserPoints = {
      pl1: `${Number(userPointsArray[0])}`,
      pl2: `${Number(userPointsArray[1])}`,
      pl3: `${Number(userPointsArray[2])}`,
      pl4: `${Number(userPointsArray[3])}`,
      pl5: `${Number(userPointsArray[4])}`,
      pl6: `${Number(userPointsArray[5])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}

updateComputerPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('computer');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('computer');
  
  let checkCompApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let compStatusArray = []
    compStatusArray.push(String(docSnapshot.data().c1), 
                         String(docSnapshot.data().c2), 
                         String(docSnapshot.data().c3))
    let compPointsArray = [100, 500, 200]
    let userPointsArray = []
    for(let n =0; n<compStatusArray.length; n++){
      if(compStatusArray[n] == "approved"){
        userPointsArray.push(Number(compPointsArray[n]));
      } else {
        userPointsArray.push(0);
      }
    }
    this.CompPoints = userPointsArray;
    this.CompPounds = userPointsArray;
    let newUserPoints = {
      c1: `${Number(userPointsArray[0])}`,
      c2: `${Number(userPointsArray[1])}`,
      c3: `${Number(userPointsArray[2])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}

updateARPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('AppliancesAndRecycling');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('AppliancesAndRecycling');
  
  let checkARApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let arStatusArray = []
    arStatusArray.push(String(docSnapshot.data().ar1), 
                      String(docSnapshot.data().ar2), 
                      String(docSnapshot.data().ar3),
                      String(docSnapshot.data().ar4),
                      String(docSnapshot.data().ar5))
    let arPointsArray = [370, 150, 120, 1030, 260];
    let userPointsArray = [];
    for(let n =0; n<arStatusArray.length; n++){
      if(arStatusArray[n] == "approved"){
        userPointsArray.push(Number(arPointsArray[n]));
      } else {
        userPointsArray.push(0);
      }
    }
    this.ARPoints = userPointsArray;
    this.ARPounds = userPointsArray;
    let newUserPoints = {
      ar1: `${Number(userPointsArray[0])}`,
      ar2: `${Number(userPointsArray[1])}`,
      ar3: `${Number(userPointsArray[2])}`,
      ar4: `${Number(userPointsArray[3])}`,
      ar5: `${Number(userPointsArray[4])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}


updateTPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('transportation');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('transportation');
  
  let checkARApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let tStatusArray = []
    tStatusArray.push(String(docSnapshot.data().t1), 
                      String(docSnapshot.data().t2), 
                      String(docSnapshot.data().t3),
                      String(docSnapshot.data().t4),
                      String(docSnapshot.data().t5),
                      String(docSnapshot.data().t6),
                      String(docSnapshot.data().t7),
                      String(docSnapshot.data().t8),
                      String(docSnapshot.data().t9))
    let tPointsArray = [730, 830, 100]
    let tPoundsArray = [730, 830, 0]
    let userPointsArray = []
    for(let n =0; n<tStatusArray.length; n++){
      if(tStatusArray[n] == "approved"){
        userPointsArray.push(Number(tPointsArray[n]));
        this.TPounds.push(tPoundsArray[n])
      } else {
        userPointsArray.push(0);
        this.TPounds.push(0);
      }
    }
    this.TPoints = userPointsArray;
    let newUserPoints = {
      t1: `${Number(userPointsArray[0])}`,
      t2: `${Number(userPointsArray[1])}`,
      t3: `${Number(userPointsArray[2])}`,
      t4: `${Number(userPointsArray[3])}`,
      t5: `${Number(userPointsArray[4])}`,
      t6: `${Number(userPointsArray[5])}`,
      t7: `${Number(userPointsArray[6])}`,
      t8: `${Number(userPointsArray[7])}`,
      t9: `${Number(userPointsArray[8])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}

updateHCPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('heatingCooling');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('heatingCooling');
  
  let checkHCApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let hcStatusArray = []
    hcStatusArray.push(String(docSnapshot.data().hc1), 
                       String(docSnapshot.data().hc2), 
                       String(docSnapshot.data().hc3), 
                       String(docSnapshot.data().hc4), 
                       String(docSnapshot.data().hc5),
                       String(docSnapshot.data().hc6))
    let hcPointsArray = [800, 590, 40, 20, 220, 660]
    let userPointsArray = []
    for(let n =0; n<hcStatusArray.length; n++){
      if(hcStatusArray[n] == "approved"){
        userPointsArray.push(Number(hcPointsArray[n]));
      } else {
        userPointsArray.push(0);
      }
    }
    this.HCPoints = userPointsArray;
    this.HCPounds = userPointsArray;
    let newUserPoints = {
      hc1: `${Number(userPointsArray[0])}`,
      hc2: `${Number(userPointsArray[1])}`,
      hc3: `${Number(userPointsArray[2])}`,
      hc4: `${Number(userPointsArray[3])}`,
      hc5: `${Number(userPointsArray[4])}`,
      hc6: `${Number(userPointsArray[5])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}

async countApprovedEd(): Promise<any>{

  let count = 0;
  let edRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education');
  var array = []
  let edSnap = edRef.get().then( snap =>{
    var obj = snap.data();
    let array = Object.values(obj);
    for (let n = 0; n<array.length; n++){
      if (array[n] == "approved"){
        count+=1;
      }
    } 
    return count
  })
  return edSnap;
}
  


arrayToString(array: Array<string>){    // This is here if we can figure out promises.
  let string = array.toString();
  console.log(string);

}


tryGetUserProgressBar(){
  const edApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education'); 
  const plApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('plug-loads'); 
  const cApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('computer'); 
  const hcApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('heatingAndCooling'); 
  const arApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('appliancesAndRecycling'); 
  const tApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('transportation'); 
  const lApprovalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('lighting'); 
  
  let checkEdApprovals = edApprovalRef.get().then(doc =>{
    if(doc.exists){
    let total = 0;
    let edApprovalArray = [doc.data().ed1, doc.data().ed2, doc.data().ed3, doc.data().ed4, doc.data().ed5];
    let count = 0;
    total += edApprovalArray.length;
    for(let n = 0; n<edApprovalArray.length; n++){
      if (edApprovalArray[n] == "approved"){
        count +=1 ;
      } 
    }
    
      let checkPlApprovals = plApprovalRef.get().then(doc =>{
        if(doc.exists){
        let plApprovalArray = [doc.data().pl1, doc.data().pl2, doc.data().pl3, doc.data().pl4, doc.data().pl5, doc.data().pl6];
        total += plApprovalArray.length;
        for(let n = 0; n<plApprovalArray.length; n++){
          if (plApprovalArray[n] == "approved"){
            count +=1 ;
          } 
        }

          let checkLApprovals = lApprovalRef.get().then(doc =>{
            if(doc.exists){
            let lApprovalArray = [doc.data().l1, doc.data().l2, doc.data().l3];
            total += lApprovalArray.length;
            for(let n = 0; n<lApprovalArray.length; n++){
              if (lApprovalArray[n] == "approved"){
                count +=1 ;
              } 
            }

              let checkCApprovals = cApprovalRef.get().then(doc =>{
                if(doc.exists){
                let cApprovalArray = [doc.data().c1, doc.data().c2, doc.data().c3];
                total += cApprovalArray.length;
                for(let n = 0; n<cApprovalArray.length; n++){
                  if (cApprovalArray[n] == "approved"){
                    count +=1 ;
                  } 
                }
                 
                  let checkARApprovals = arApprovalRef.get().then(doc =>{
                    if(doc.exists){
                    let arApprovalArray = [doc.data().ar1, doc.data().ar2, doc.data().ar3, doc.data().ar4, doc.data().ar5];
                    total += arApprovalArray.length;
                    for(let n = 0; n<arApprovalArray.length; n++){
                      if (arApprovalArray[n] == "approved"){
                        count +=1 ;
                      } 
                    }

                      let checkTApprovals = tApprovalRef.get().then(doc =>{
                        if(doc.exists){
                        let tApprovalArray = [doc.data().t1, doc.data().t2, doc.data().t3, doc.data().t4, doc.data().t5, doc.data().t6, doc.data().t7, doc.data().t8, doc.data().t9];
                        total += tApprovalArray.length;
                        for(let n = 0; n<tApprovalArray.length; n++){
                          if (tApprovalArray[n] == "approved"){
                            count +=1 ;
                          } 
                          }
                          
                              let checkHCApprovals = hcApprovalRef.get().then(doc =>{
                                if(doc.exists){
                                let hcApprovalArray = [doc.data().hc1, doc.data().hc2, doc.data().hc3, doc.data().hc4, doc.data().hc5, doc.data().hc6];
                                total += hcApprovalArray.length;
                                for(let n = 0; n<hcApprovalArray.length; n++){
                                  if (hcApprovalArray[n] == "approved"){
                                    count +=1 ;
                                    } 
                                  }

                                  }
                                }
                              )}
                            }
                          )}
                         }
                      )}
                    }
              )}
           }
      )}

      var countPercent = (count/total)*100;
      this.userPledgeCount = countPercent;
      console.log(this.userPledgeCount);
    }
  
   )}
   
  })
  
  }
}
