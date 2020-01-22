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
  public EPPoints: Array<Number>;
  public TYPoints: Array<Number>;
  public TPPoints: Array<Number>;
  public HCPoints: Array<Number>;
  public PLPounds: Array<Number>;
  public CompPounds: Array<Number>;
  public EPPounds: Array<Number>;
  public TYPounds: Array<Number>;
  public TPPounds: Array<Number>;
  public HCPounds: Array<Number>;
  public userTotalPoundsCarbon: number;
  public hasStarted: boolean;

  constructor(private profileService: ProfileService) {}


ngOnInit() {

  var user = firebase.auth().currentUser;
  if (user != null) {
    this.uid = user.uid; 
  }

  this.hasUserStartedModules();
  this.doesUserHaveTeam();


}

hasUserStartedModules() {    //Check to see if user has started any modules.
  const checkStart = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('education').get().then((edSnap)=>{  
    if (edSnap.exists){                   //does the very first pledge exist in their database? if so, it will show personal progress.
      this.hidePersonalProgress = false;
    
      this.updateUserPoints();
      this.updateEdPledgeComplete();
      this.updateTotalUserPledgesComplete();
      this.getUserProgressBar();
      this.getUserData();

    } else {

    }
  })
}


doesUserHaveTeam(){
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let getTeam = userRef.get().then(user => {
    if (user.data().team != undefined){
      this.hideTeamProgressBar = false;
      this.team = user.data().team
      this.teamAndCityProgressBarTotals();
      this.updateTotalTeamPledgesComplete();
      this.getUserandTeamData();
      
    } else{
      this.hideTeamProgressBar = true;
      this.cityProgressBarTotals();
      
    }
  })
}

getUserandTeamData(){
  this.profileService.getUserProfile().then((userProfileSnapshot) => {    //Get team from user profile and store in public variables to display on page
    if (userProfileSnapshot.data()) {
      this.userPoints = Number(userProfileSnapshot.data().points);
      this.team= String(userProfileSnapshot.data().team);
      let teamPointsSearch = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{
        this.teamAccessCode = String(docSnapshot.data().accessCode);
        this.teamTotalPoundsCarbon = Number(docSnapshot.data().totalPoundsCarbon);
      })
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

getUserData(){        // Remove Team Info
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

updateEdPledgeComplete(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education'); 

  let checkApprovals = approvalRef.get().then(doc =>{
    let approvedArray = [doc.data().ed1, doc.data().ed2, doc.data().ed3, doc.data().ed4, doc.data().ed5];
    let count = 0;
    for(let n = 0; n<approvedArray.length; n++){
      if(approvedArray[n] == "approved"){
        count +=1
      }
    }
    let newEdPledgeComplete = {
      edPledgeComplete: `${count}`
    }
    let update = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(newEdPledgeComplete);
  })
}

updateTotalUserPledgesComplete(){
  
  let user = firebase.firestore().collection('userProfile').doc(`${this.uid}`).get().then(user =>{
    var ed = 0;
    var pl = 0;
    var c = 0;
    var l = 0; 
    var ep = 0; 
    var hc = 0;
    var tp = 0;
    var ty = 0; 
    if (user.data().edPledgeComplete != undefined){
      ed = Number(user.data().edPledgeComplete);
    }
    if (user.data().plPledgeComplete != undefined){
      pl = Number(user.data().plPledgeComplete);
    }
    if (user.data().cPledgeComplete != undefined){
      c = Number(user.data().cPledgeComplete);
    }
    if (user.data().epPledgeComplete != undefined){
      ep = Number(user.data().epPledgeComplete);
    }
    if (user.data().hcPledgeComplete != undefined){
      hc = Number(user.data().hcPledgeComplete);
    }
    if (user.data().tpPledgeComplete != undefined){
      tp = Number(user.data().tpPledgeComplete);
    }
    if (user.data().tyPledgeComplete != undefined){
      ty = Number(user.data().tyPledgeComplete);
    }
    if (user.data().lPledgeComplete != undefined){
      l = Number(user.data().lPledgeComplete);
    }
    let total = ed + pl + c + hc + l + ep + ty + tp;
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
    var ep = 0; 
    var hc = 0;
    var tp = 0;
    var ty = 0; 
    if (snap.data().edPledgeComplete != undefined){
      ed = Number(snap.data().edPledgeComplete);
    }
    if (snap.data().plPledgeComplete != undefined){
      pl = Number(snap.data().plPledgeComplete);
    }
    if (snap.data().cPledgeComplete != undefined){
      c = Number(snap.data().cPledgeComplete);
    }
    if (snap.data().epPledgeComplete != undefined){
      ep = Number(snap.data().epPledgeComplete);
    }
    if (snap.data().hcPledgeComplete != undefined){
      hc = Number(snap.data().hcPledgeComplete);
    }
    if (snap.data().tpPledgeComplete != undefined){
      tp = Number(snap.data().tpPledgeComplete);
    }
    if (snap.data().tyPledgeComplete != undefined){
      ty = Number(snap.data().tyPledgeComplete);
    }
    if (snap.data().lPledgeComplete != undefined){
      l = Number(snap.data().lPledgeComplete);
    }
    let total = ed + pl + c + hc + l + ep + ty + tp;
    let newTotal = {
      totalPledgesComplete: `${total}`
    }
     let update = firebase.firestore().collection('teams').doc(`${team}`).update(newTotal);
    })
  })
}

cityProgressBarTotals(){
  //__________________________________Get City info for city progress bar
  let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
    this.cityTotalPledgeCount = Number(docSnapshot.data().edPledgeComplete);
    this.cityUserNumber = Number(docSnapshot.data().totalUsers);

    var totalCityPledges = 5*Number(this.cityUserNumber);
    this.cityProgressBar = Number((Number(this.cityTotalPledgeCount)/totalCityPledges)*100);
  })
}

teamAndCityProgressBarTotals(){
this.updateTotalTeamPledgesComplete();
this.profileService.getUserProfile().then((userProfileSnapshot) => {

    this.userPoints = Number(userProfileSnapshot.data().points);
    this.team= String(userProfileSnapshot.data().team);
    
//______________________________________Check for team, show team progress bar if user has team

    if (this.team == 'undefined'){
      this.hideTeamProgressBar = true;

      //__________________________________Get City info for city progress bar
      let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityTotalPledgeCount = Number(docSnapshot.data().edPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);

        var totalCityPledges = 5*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityTotalPledgeCount)/totalCityPledges)*100);
      })

    } else{
      
      //__________________________________Get team info for team progress bar
      let getTeamInfo = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{

      this.teamPoints = Number(docSnapshot.data().teamPoints);
      this.teamTotalPledgeCount = Number(docSnapshot.data().totalPledgesComplete);
      this.teamUsers = Number(docSnapshot.data().teamUsers);
      
      //__________________________________Get City info for city progress bar
      let getCityInfo = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityTotalPledgeCount = Number(docSnapshot.data().edPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);
        this.totalPledgesPossiblePerUser = Number(docSnapshot.data().totalPossiblePledgesPerUser);
  
        var totalTeamPledges = Number(this.totalPledgesPossiblePerUser) * Number(this.teamUsers);
        this.teamProgressBar = Number((Number(this.teamTotalPledgeCount)/totalTeamPledges)*100);
      
        var totalCityPledges = Number(this.totalPledgesPossiblePerUser)*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityTotalPledgeCount)/totalCityPledges)*100);
      })
    }) 

    }
  })

}  


getUserProgressBar(){
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      let userPledges = Number(userProfileSnapshot.data().totalPledgesComplete)

      let getCityInfo = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.totalPledgesPossiblePerUser = Number(docSnapshot.data().totalPossiblePledgesPerUser);

        this.userProgressBar = (Number(userPledges)/Number(this.totalPledgesPossiblePerUser))*100;
 

      })
    
    }
  })
}


thingsCopiedFromEd1(){
  //_________________________Get Team Info and Update Team Points and Update Team Pledge Progress Count_________________
  const teamRef = firebase.firestore().collection("teams").doc(`${this.team}`);
  let getTeam = teamRef.get().then(doc =>{
      var teamPoints = doc.data().points;
      let newTeamPoints = Number(teamPoints) + 100;   //Update with correct points

      var teamPoundsCarbon = Number(doc.data().totalPoundsCarbon)
      let newTeamCarbonReductions = Number(teamPoundsCarbon) + 0; //Update team pounds of CO2

      var teamPledgeCount = doc.data().edPledgeComplete;
      let newTeamPledgeCount = Number(teamPledgeCount) + 1;      //Update team pledge count

      let newInfoTeam = {
        points: `${newTeamPoints}`,
        edPledgeComplete: `${newTeamPledgeCount}`,
        totalPoundsCarbon: `${newTeamCarbonReductions}`
        }
      let updateTeamInfo = teamRef.update(newInfoTeam);
  })

  //_________________________Get City Info and Update City Points_________________
  const cityRef = firebase.firestore().collection("cityOverall").doc("cityOverall");
  let getCity = cityRef.get().then(doc => {
      var cityPoints = doc.data().points;
      let newCityPoints = Number(cityPoints) + 100;    //Update with correct points
      
      var cityPledgeCount = doc.data().edPledgeComplete;
      let newCityPledgeCount = Number(cityPledgeCount) + 1; //update pledge count

      var cityCarbonEmissions = Number(doc.data().totalPoundsCarbon);
      let newCityCarbonReductions = Number(cityCarbonEmissions) + 0;   //update carbon reductions
      
    
      let newInfoCity = {
        points: `${newCityPoints}`,
        edPledgeComplete: `${newCityPledgeCount}`,
        totalCarbonEmissions: `${newCityCarbonReductions}`
      }
      let updateCityInfo = cityRef.update(newInfoCity);
  })

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

updateUserPoints(){

this.updateEdPoints();
this.updatePLPoints();
this.updateComputerPoints();
this.updateEPPoints();
this.updateTYPoints();
this.updateTPPoints();
this.updateHCPoints();


this.updateTeamEdPounds();
this.updateTeamEdPledges();

}


updateEdPoints(){
const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education');
const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('education');

let checkEdApprovals = approvalRef.get().then((docSnapshot) => {
  if (docSnapshot.data()){
  let edStatusArray = []
  edStatusArray.push(String(docSnapshot.data().ed1), 
                     String(docSnapshot.data().ed2), 
                     String(docSnapshot.data().ed3), 
                     String(docSnapshot.data().ed4), 
                     String(docSnapshot.data().ed5));
  let edPointsArray = [100, 100, 200, 100, 250];
  let userPointsArray = [];
  for(let n =0; n<edStatusArray.length; n++){
    if(edStatusArray[n] == "approved"){
      userPointsArray.push(Number(edPointsArray[n]));
    } else {
      userPointsArray.push(0);
    }
  }
  this.EdPoints = userPointsArray;
  let newUserPoints = {
    ed1: `${Number(userPointsArray[0])}`,
    ed2: `${Number(userPointsArray[1])}`,
    ed3: `${Number(userPointsArray[2])}`,
    ed4: `${Number(userPointsArray[3])}`,
    ed5: `${Number(userPointsArray[4])}`
  }
  let updateDBPoints = pointsRef.update(newUserPoints);
  }
  })
  this.updateTeamEdPounds();
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
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('plugLoads');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('plugLoads');
  
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

updateEPPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('EquipmentAndPurchasing');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('EquipmentAndPurchasing');
  
  let checkEPApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let epStatusArray = []
    epStatusArray.push(String(docSnapshot.data().ep1), 
                      String(docSnapshot.data().ep2), 
                      String(docSnapshot.data().ep3),
                      String(docSnapshot.data().ep4),
                      String(docSnapshot.data().ep5))
    let epPointsArray = [370, 150, 120, 1030, 260]
    let userPointsArray = []
    for(let n =0; n<epStatusArray.length; n++){
      if(epStatusArray[n] == "approved"){
        userPointsArray.push(Number(epPointsArray[n]));
      } else {
        userPointsArray.push(0);
      }
    }
    this.EPPoints = userPointsArray;
    this.EPPounds = userPointsArray;
    let newUserPoints = {
      ep1: `${Number(userPointsArray[0])}`,
      ep2: `${Number(userPointsArray[1])}`,
      ep3: `${Number(userPointsArray[2])}`,
      ep4: `${Number(userPointsArray[3])}`,
      ep5: `${Number(userPointsArray[4])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}


updateTYPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('transportationYou');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('transportationYou');
  
  let checkEPApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let tyStatusArray = []
    tyStatusArray.push(String(docSnapshot.data().ty1), 
                      String(docSnapshot.data().ty2), 
                      String(docSnapshot.data().ty3))
    let tyPointsArray = [730, 830, 100]
    let tyPoundsArray = [730, 830, 0]
    let userPointsArray = []
    for(let n =0; n<tyStatusArray.length; n++){
      if(tyStatusArray[n] == "approved"){
        userPointsArray.push(Number(tyPointsArray[n]));
        this.TYPounds.push(tyPoundsArray[n])
      } else {
        userPointsArray.push(0);
        this.TYPounds.push(0);
      }
    }
    this.TYPoints = userPointsArray;
    let newUserPoints = {
      ty1: `${Number(userPointsArray[0])}`,
      ty2: `${Number(userPointsArray[1])}`,
      ty3: `${Number(userPointsArray[2])}`
    }
    let updateDBPoints = pointsRef.update(newUserPoints);
    }
  })
}

updateTPPoints(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('transportationProducts');
  const pointsRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('points').doc('transportationProducts');
  
  let checkTPApprovals = approvalRef.get().then((docSnapshot) => {
    if (docSnapshot.data()){
    let tpStatusArray = []
    tpStatusArray.push(String(docSnapshot.data().tp1), 
                       String(docSnapshot.data().tp2), 
                       String(docSnapshot.data().tp3), 
                       String(docSnapshot.data().tp4), 
                       String(docSnapshot.data().tp5),
                       String(docSnapshot.data().tp6))
    let tpPointsArray = [800, 590, 40, 20, 220, 660]
    let userPointsArray = []
    for(let n =0; n<tpStatusArray.length; n++){
      if(tpStatusArray[n] == "approved"){
        userPointsArray.push(Number(tpPointsArray[n]));
      } else {
        userPointsArray.push(0);
      }
    }
    this.TPPoints = userPointsArray;
    this.TPPounds = userPointsArray;
    let newUserPoints = {
      tp1: `${Number(userPointsArray[0])}`,
      tp2: `${Number(userPointsArray[1])}`,
      tp3: `${Number(userPointsArray[2])}`,
      tp4: `${Number(userPointsArray[3])}`,
      tp5: `${Number(userPointsArray[4])}`,
      tp6: `${Number(userPointsArray[5])}`
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

}

