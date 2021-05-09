console.log('ver 4.1');
// async function fetchGas(url, option) {
//   // const url = 'https://script.google.com/macros/s/AKfycbwstcwS_BWdZsse_52u_PQI3spN6cGf7DHxCV5qtfLBqvh7_79gPcsi8-86Zy77lEoIww/exec?t=ファイフ&g=11班';
//   let obj;
//   obj = await fetch(url, option).then(function(response) {
//     return response;
//   });
//   return obj;
// }

var app = new Vue({
  el: "#app",
  data: {
    gest: false,
    team: "",
    userName: "",
    teams: ["ファイフ", "ドラム", "鼓笛女子"],
    group: "",
    nameList: [],
    groups: {
      ファイフ: [
        {value: "", disabled: true, name: "班を選ぶ"},
        {value: "1班", disabled: false, name: "1班"},
        {value: "2班", disabled: false, name: "2班"},
        {value: "3班", disabled: false, name: "3班"},
        {value: "4班", disabled: false, name: "4班"},
        {value: "5班", disabled: false, name: "5班"},
        {value: "6班", disabled: false, name: "6班"},
        {value: "7班", disabled: false, name: "7班"},
        {value: "8班", disabled: false, name: "8班"},
        {value: "9班", disabled: false, name: "9班"},
        {value: "10班", disabled: false, name: "10班"},
        {value: "11班", disabled: false, name: "11班"},
        {value: "12班", disabled: false, name: "12班"},
        {value: "13班", disabled: false, name: "13班"},
      ],
      ドラム: [
        {value: "", disabled: true, name: "班を選ぶ"},
        {value: "1班", disabled: false, name: "1班"},
        {value: "2班", disabled: false, name: "2班"},
        {value: "3班", disabled: false, name: "3班"},
        {value: "4班", disabled: false, name: "4班"},
        {value: "5班", disabled: false, name: "5班"},
        {value: "6班", disabled: false, name: "6班"},
      ],
      鼓笛女子: [
        {value: "", disabled: true, name: "班を選ぶ"},
        {value: "1班", disabled: false, name: "1班"},
        {value: "2班", disabled: false, name: "2班"},
        {value: "3班", disabled: false, name: "3班"},
        {value: "4班", disabled: false, name: "4班"},
        {value: "5班", disabled: false, name: "5班"},
        {value: "6班", disabled: false, name: "6班"},
        {value: "7班", disabled: false, name: "7班"},
        {value: "8班", disabled: false, name: "8班"},
        {value: "9班", disabled: false, name: "9班"},
        {value: "10班", disabled: false, name: "10班"},
        {value: "11班", disabled: false, name: "11班"},
      ],
    },
    firstDate: "", // エポックミリ秒
    dates: [
      {date: "-/-", day: "(-)"},
      {date: "-/-", day: "(-)"},
      {date: "-/-", day: "(-)"},
      {date: "-/-", day: "(-)"},
      {date: "-/-", day: "(-)"},
      {date: "-/-", day: "(-)"},
      {date: "-/-", day: "(-)"},
    ],
    // dates: ["-", "-", "-", "-", "-", "-", "-"],
    // days: ["(-)", "(-)", "(-)", "(-)", "(-)", "(-)", "(-)"],
    valueLabels: ["×", "〇", "◎", "ー"],
    checkInvalid: false,
    items: [
      {delBtn:false, editBtn:false, label:"ハイニコポン", textArea:false, values:[3, 3, 3, 3, 3, 3, 3]},
      {delBtn:false, editBtn:false, label:"学校から帰ったらすぐ宿題", textArea:false, values:[3, 3, 3, 3, 3, 3, 3]},
      {delBtn:false, editBtn:false, label:"手をついて親に朝晩のご挨拶", textArea:false, values:[3, 3, 3, 3, 3, 3, 3]},
      {delBtn:false, editBtn:false, label:"決められたお手伝い", textArea:false, values:[3, 3, 3, 3, 3, 3, 3]},
      {delBtn:false, editBtn:false, label:"親に喜んでもらうために自主的にお手伝いをする", textArea:false, values:[3, 3, 3, 3, 3, 3, 3]},
      {delBtn:false, editBtn:false, label:"楽器の練習", textArea:false, values:[3, 3, 3, 3, 3, 3, 3]},
      {delBtn: true, editBtn:true, label: "", textArea: true, values: [3, 3, 3, 3, 3, 3, 3]},
    ],
    submitting: false,
    requesting: false,
    success: false,
    unsubmittable: false,
    submitBtnTxt: "提出",
    // reqestBtnTxt: "次へ",
    showCtrl: false,
  },
  methods: {
    fillDates: function(firstDate) {
      this.firstDate = firstDate;
      const daysStr = [ "日", "月", "火", "水", "木", "金", "土" ];
      
      // firstDateをDate型に置き換え
      var nextDate = new Date(firstDate);
      for(let i=0; i<this.dates.length; i++) {
        // console.log("i: " + i);
        // console.log(" %d/%d %d", nextDate.getMonth()+1, nextDate.getDate(), nextDate.getDay());
        
        // 日付
        const dateStr = (nextDate.getMonth()+1) + "/" + nextDate.getDate();
        // 曜日(整数)
        const dayStr = "(" + daysStr[nextDate.getDay()] + ")";
        
        // 配列の要素を"="で書き換えてもVueは値の変更を監視できないので、$setを使う
        this.$set(this.dates, i, {date: dateStr, day: dayStr});

        // 翌日のセット
        nextDate.setDate(nextDate.getDate() + 1);
      }
      this.dates.forEach(val => console.log(val.date, val.day));
      // console.log(this.dates);
      // console.log(this.days);
    },
    nextValue: function(no, valueIndex) { // 引数は(行, 列)
      // console.log("in nextValue \nno: %d, valueIndex: %d", no, valueIndex);
      // 配列の要素を"="で書き換えてもVueは値の変更を監視できないので、$setを使う
      this.$set(this.items[no].values, valueIndex, (this.items[no].values[valueIndex]+3-1) % 3);
      // console.log(this.items[no].values[valueIndex]);
    },
    changeBtnColor: function(valueIndex, e) {
      console.log(e.srcElement);
      e.srcElement.style.background = "#91C877";
    },
    replaceNameList: function(list) {
      // 全要素を削除
      this.nameList.splice(0);
      // 挿入
      this.nameList.push(list);
      // 2次元を1次元に
      this.nameList = this.nameList.flat();
      console.log(this.nameList.toString());
    },
    addFreeLabel: function() {
      const no = this.items.length;
      this.items.push({delBtn: true, no: no, label: "", textArea: true, values: [3, 3, 3, 3, 3, 3, 3]});
    },
    setLabels: function(labels) {
      // {delBtn: false, label: "ハイニコポン", textArea: false, values: [3, 3, 3, 3, 3, 3, 3]},
      // 全要素を削除
      this.items.splice(0, this.items.length);

      for(let i=0; i<labels.length; i++) {
        var item = {};
        item.label = labels[i];
        item.values = [3, 3, 3, 3, 3, 3, 3];

        if(labels[i] == "") {
          item.textArea = true;
        } else {
          item.textArea = false;
        }

        if(i<6) {
          item.delBtn = false;
          item.editBtn = false;
        } else {
          item.delBtn = true;
          item.editBtn = true;
        }

        this.items.push(item);
      }
    },
    delRow: function(i) {
      Swal.fire({
        title: "確認",
        text: (this.items[i].label || "空白") + " の行を削除します。",
        confirmButtonText: "削除",
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: "戻る",
      }).then((result) => {
        if(result.isConfirmed) {
          app.items.splice(i, 1);
        }
      });
    },
    makeEditable: function(i) {
      this.items[i].textArea = true;
      this.items[i].editBtn = true;
    },
    // confirm: function() {
    //   var check;
    //   if(this.gest) {
    //     const checkCls = ["freeLabel"];
    //     check = checkInputs([], checkCls);
    //   } else {
    //     check = true;
    //   }
    //   // 一つでも未入力があればトップへ移動
    //   // console.log("check of inputs: " + check);
    //   if(!check) {
    //     // window.scrollTo({
    //     //   top: 0,
    //     //   left: 0,
    //     //   behavior: 'smooth'
    //     // });
    //   } else {
    //     Swal.fire({
    //       title: "提出確認",
    //       text: "「パート」「班」「氏名」に間違いはありませんか？",
    //       confirmButtonText: "提出",
    //       showCancelButton: true,
    //       cancelButtonText: "戻る",
    //       reverseButtons: true,
    //     }).then((result) => {
    //       if(result.isConfirmed) {
    //         this.send();
    //       }
    //     });
    //   }
    // },
    // send: function() {
    //   // console.log("in send")
    //   // 提出ボタンを「提出中」に変更
    //   this.submitBtnTxt = "提出中";
    //   this.submitting = true;

    //   var team, group, userName;
    //   team = this.team;
    //   group = this.group;
    //   userName = this.userName;

    //   // 子供と親からのコメント
    //   comments = [
    //     document.getElementById("commentChld").value,
    //     document.getElementById("commentPrnt").value,
    //   ];
      
    //   if(this.calSumOfByDate()) {
    //     // google.script.run
    //     // .withSuccessHandler(function(comment) { // 上手く値が返ってきた時
    //     //   // 自由項目を、"$"で区切った文字列で取得
    //     //   var labelsStr = this.getLabels();

    //     //   // Local Storageに保存
    //     //   setLocalStorage(userName, labelsStr);

    //     //   // コメントサイトに移動
    //     //   submitSuccessed(comment);
    //     // })
    //     // .withFailureHandler(submitError) // 値が返ってこなかった時
    //     // .writeSpreadSheet(this.firstDate, team, group, userName, this.items, comments);
    //   } else {
    //     console.log("calSumOfByDate returned false");
    //   }
    //   // console.log(this.firstDate);
    //   // console.log(userName);
    //   console.log(this.firstDate);
    // },
    calSumOfByDate: function() {
      // console.log("in calSumOfByDate");
      // console.log(this.items.length);
      // console.log(this.items.length);
      var sum = 0;
      var comfirmed = true;
      rootLoop:
      for(let i=0; i<this.items.length; i++) {
        for(let j=0; j<this.items[0].values.length; j++) {
          console.log(this.items[i].values[j] % 3);
          if(this.items[i].values[j] == 3) {
            console.log("%d行:%d列目が空白", i, j);
            if(!this.checkInvalid) {
              comfirmed = false;
              this.submitting = false;
              this.submitBtnTxt = "提出"; 
              this.tableBlank(i, j);
              break rootLoop;
            }
          } else {
          }
        }
        // sum += this.items[i].values[valueIndex] % 3;
      }
      if(comfirmed) {
        console.log("the table has completely been filled");
      } else {
        console.log("there is/are black in table.");
      }

      return comfirmed;
    },
    tableBlank: function(row, col) {
      Swal.fire({
        icon: "error",
        title: "〇×表に空白があります",
        text: `${this.dates[col]['date']} ${this.dates[col]['day']}の「${this.items[row]['label']}」が空白のままです。`,
        confirmButtonText: "戻る",
      });
    },
    // 全ての項目(自由項目以外も)を配列にし、"$"で区切った文字列に変換して渡す
    getLabels: function() {
      var labels = this.items.map(item => item.label);
      // this.items.forEach(item => labels.push(item.label));

      return labels;
    },
  },
  watch: {
    userName: function(userName) {
      // LocalStorageから項目(自由項目以外も含む全項目)を取得
      var labels = getLabelsFromStorage(userName);
      // 表に項目をセット
      this.setLabels(labels);
    },
  },
});

function getLabelsFromStorage(name) {
  var labels = localStorage[name];

  // もしLocalStorageに保存されていなければ
  if(!labels) {
    labels = ["ハイニコポン", "学校から帰ったらすぐ宿題(土日は自主勉強)", "手をついて親に朝晩のご挨拶", "スーパーノートで決めているお手伝いをする", "親に喜んでもらうために自主的にお手伝いをする", "楽器の練習", "", "", "", "", ""];
  } else {
    labels = labels.split(",");
  }

  return labels;
}

// LocalStorageがあるかどうかの確認
function checkLocalStorage() {
  var team, group, freeLabel;
  var userName = localStorage.userName;
  
  if(typeof userName === "undefined") { // 初回入力
    console.log("new user (name: %s)", userName);
      
    app.gest = true;
    
    // localStorage.userName = "Natsuki";
    // localStorage.team = "Operater";
  } else { // 2回目以降の入力
    team = localStorage.team;
    group = localStorage.group;
    freeLabel = localStorage.fLabel;
    app.items[app.items.length-1].label = freeLabel;
    app.items[app.items.length-1].textArea = false;
    app.gest = false;
    
    console.log("not new user(name: %s, team: %s, group: %s, freeLabel: %s)", userName, team, group, freeLabel);
    
    app.userName = userName;
    app.team = team;
    app.group = group;
  }
}
// setLocalStorage();
// checkLocalStorage();
calcFirstDate();


function setLocalStorage(userName, labels) {
  // console.log(userName, labels);
  localStorage[userName] = labels;
  // localStorage.userName = userName;
  // localStorage.fLabel = freeLabels;
}

function clearLocalStorage() {
  for(let i=6; i<app.items.length; i++) {
    app.items[i].label = "";
    app.items[i].textArea = true;
  }
  
  localStorage.clear();
  app.gest = true;
  alert("LocalStorage が削除されました。");
}

function calcFirstDate() {
  let today = new Date();
  
  let isSat;
  // 期限を土曜朝8時に延長
  if(today.getDay() == 5) {
  } else if(today.getDay() == 6 && today.getHours() <= 12) {
    isSat = true;
    console.log("isSat", isSat);
    unsubmittable(isSat);
  } else {
    isSat = true;
    // isSat = false;
    console.log("isSat", isSat);
    unsubmittable(isSat);
  }
  
  // 土曜日にアクセスすると、一つ前の週として処理
  if(today.getDay() == 6) {
    today.setDate(today.getDate() - 1);
  }
  
  let date = today.getDate() - (today.getDay() + 1) % 7;
  let firstDate = new Date(today.getFullYear(), today.getMonth(), date);
  console.log("firstDate is %d/%d", firstDate.getMonth()+1, firstDate.getDate());
  app.fillDates(firstDate.getTime());
}

function unsubmittable(isSat) {
  console.log('unsubmittable', isSat);
  Swal.fire({
    icon: 'error',
    title: '今日は提出できません',
    text: '提出は金曜におこなってください。',
  });
  
  // 土曜日なら、ボタンは押せる
  if(isSat) {
    app.unsubmittable = false;
  } else {
    app.unsubmittable = true;
  }
  
  app.success = true;
  console.log("unsubmittable ", app.unsubmittable);
  console.log("success ", app.success);
}

// checkIdsのそれぞれの要素をidに持つinputが全て記入済かどうかを返す
function checkInputs(checkIds, checkCls) {
  // 未入力をチェックするinputのid
  // var checkIds = ["team", "group", "fName", "gName", "freeLabel", "commentChld", "commentPrnt"];
  // var checkCls = ["freeLabel"];
  
  var result = true;
  var element, elements;

  // idで指定した要素のチェック
  for(id of checkIds) {
    element = document.getElementById(id);
    if(checkEntered(element)) {
      // console.log("entered");
      showError(element, false);
    } else {
      // console.log("unentered");
      result = false;
      showError(element, true);
    }
  }

  // classで指定した要素のチェック
  for(cls of checkCls) {
    elements = document.getElementsByClassName(cls);
    for(element of elements) {
      if(checkEntered(element)) {
        // console.log("entered");
        showError(element, false);
      } else {
        // console.log("unentered");
        result = false;
        showError(element, true);
      }
    }
  }

  return result;
}
// 引数をidに持つinputが入力されたかどうか
function checkEntered(el) {
  // console.log(el);
  var value = el.value;
  // console.log(value);
  var result;
  if(value == "") {
    result = false;
  } else {
    result = true;
  }
  // console.log("in checkEntered:\n%s is %s", id, result ? "entered" : "blank");
  return result;
}

// 引数をidに持つ要素が未入力であることを表示
function showError(el, isError) {
  // console.log("in showError");
  var element = el;

  // errorなら
  if(isError) {
    element.classList.add("error");
    element.parentNode.classList.add("errorParent");
    element.parentNode.parentNode.classList.add("errorGrandParent");
  } else {
    element.classList.remove("error");
    element.parentNode.classList.remove("errorParent");
    element.parentNode.parentNode.classList.remove("errorGrandParent");
  }
}

// 最後に全てのinputが入力済みであるかを確認
function checkAllInputs() {
  const checkIds = {"team": "パート", "group": "班", "userName": "氏名", "commentChld": "子供からのコメント　", "commentPrnt": "親からのコメント"};
  let check = true;
  let text = "";
  // const checkCls = [];

  for(id in checkIds) {
    // console.log(id);
    el = document.getElementById(id);
    if(el.value == "") {
      text += "「" + checkIds[id] + "」";
      check = false;
    }
  }
  
  if(!check) {
    Swal.fire({
      title: "未記入の箇所があります",
      text: text + "を記入してください",
      icon: 'error',
    });
  }

  return check;
}

// 提出成功
function submitSuccessed(score) {
  // Swal.fire({
  //   icon: 'success',
  //   title: '提出されました',
  // });
  app.submitting = false;
  app.unsubmittable = false;
  app.success = true;
  app.submitBtnTxt = "提出されました";

  console.log(score);
  
  window.top.location.href = "https://script.google.com/macros/s/AKfycbxW_W_dqUzBbJ30aylWYXzX-s816DX7DJ09cxAKaP36HffVAABDIneFag/exec?p=result&score=" + score;
}

// 提出できなかった時のエラー表示
function submitError(e) {
  console.log(e);
  app.submitting = false;
  app.unsubmittable = false;
  app.success = false;
  app.submitBtnTxt = "提出"
  Swal.fire({
    icon: 'error',
    title: '提出失敗',
    text: '上手く提出されませんでした。もう一度提出してください。\n' + e,
  });
}

function showPassInput() {
  Swal.fire({
    title: "Enter Password",
    text: "Enter password to show control for admin.",
    input: "password",
  }).then((result) => {
    // console.log("password has been entered: %s", result.value);
    if(result.value == "asdf") {
      app.showCtrl = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "don't use this except administrator.",
      });
    }
  });
}


// <!-- Created By CodingNepal -->
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  // event.preventDefault();
  const checkIds = ["team", "group"];
  check = checkInputs(checkIds, []);
  // check = true;
  if(check) {
    app.requesting = true;
    const team = app.team;
    const group = app.group;
    
    const url = 'https://script.google.com/macros/s/AKfycbwstcwS_BWdZsse_52u_PQI3spN6cGf7DHxCV5qtfLBqvh7_79gPcsi8-86Zy77lEoIww/exec?t=' + team + '&g=' + group;
    const option = {method:"GET", mode:"cors"};
    
    axios.get(url).then(res => {
      app.requesting = false;
      app.replaceNameList(res.data.list);
      slideToSec();
    }).catch(error => {
      console.log(error);
    });
    // fetchGas(url, option).then(response => {
    //   console.log(response);
    //   return response.text();
    // }).then(function(text) {
    //   // console.log(text);
    //   obj = JSON.parse(text || null);
    //   // alert(obj.msg);
    //   return obj;
    // }).then(obj => {
    //   app.requesting = false;
    //   app.replaceNameList(obj.list);
    //   slideToSec();
    // });
    // fetchGas(url, option).then(obj => {
    //   app.requesting = false;
    //   app.replaceNameList(obj.list);
    //   slideToSec();
    // });
    // google.script.run
    //   .withSuccessHandler(function(list) {
    //     app.requesting = false;
    //     app.replaceNameList(list);
    //     slideToSec();
    //   }) // 上手く値が返ってきた時
    //   .withFailureHandler(function(error) {
    //     alert(error);
    //   }) // 値が返ってこなかった時
    //   .getGroupNameList(team, group);
  }
});

function slideToSec() {
  console.log("slideToSec");
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
}

nextBtnSec.addEventListener("click", function(event){
  // event.preventDefault();
  const checkIds = ["userName"];
  check = checkInputs(checkIds, []);
  // check = true;
  if(check) {
    slideToThrd();
  }
});

function slideToThrd() {
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
}

nextBtnThird.addEventListener("click", function(event){
  // event.preventDefault();
  const checkCls = ["freeLabel"];
  check = checkInputs([], checkCls) && app.calSumOfByDate();
  // check = true;
  if(check) {
    app.requesting = true;
    
    slidePage.style.marginLeft = "-75%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }
});

submitBtn.addEventListener("click", function(){
  const checkIds = ["commentChld", "commentPrnt"];
  check = checkInputs(checkIds, []);
  if(check) {
    check = check && checkAllInputs();
  }
  if(check) {
    // 提出確認
    Swal.fire({
      title: '提出確認',
      html: '以下の内容は間違っていませんか？' +
        '<div>パート:' + app.team + '</div>' +
        '<div>班:' + app.group + '</div>' +
        '<div>氏名:' + app.userName + '</div>',
      showCancelButton: true,
      cancelButtonText: '戻る',
      reverseButtons: true,
      confirmButtonText: '提出',
    }).then((result) => {
      if(result.isConfirmed) {
        submit();
      }
    });
  }
  // setTimeout(function(){
  //   alert("Your Form Successfully Signed up");
  //   location.reload();
  // },800);
});
let respp;
async function submit() {
  app.submitBtnTxt = "提出中";
  app.submitting = true;
  // 子供と親からのコメント
  comments = [
    document.getElementById("commentChld").value,
    document.getElementById("commentPrnt").value
  ];
  // console.log("check point");
  // console.log(app.firstDate, app.team, app.group, app.userName, app.items, comments);
  const url = 'https://script.google.com/macros/s/AKfycbwstcwS_BWdZsse_52u_PQI3spN6cGf7DHxCV5qtfLBqvh7_79gPcsi8-86Zy77lEoIww/exec';
  // const url = 'https://script.google.com/macros/s/AKfycbwstcwS_BWdZsse_52u_PQI3spN6cGf7DHxCV5qtfLBqvh7_79gPcsi8-86Zy77lEoIww/exec';
  let body = {
    firstDate: app.firstDate,
    team: app.team,
    group: app.group,
    userName: app.userName,
    items: JSON.stringify(app.items),
    comments: JSON.stringify(comments),
  };
  // console.log(body);
  
  let bodyStr = Object.entries(body).reduce( (l, [k,v])=> { l.append(k, v); return l; }, new FormData());
  const option = {
    method: "POST",
    mode: 'no-cors',
    body: body,
    followAllRedirects: true,
  }
  
  const params = new URLSearchParams();
  params.append('firstDate', app.firstDate);
  params.append('team', app.team);
  params.append('group', app.group);
  params.append('userName', app.userName);
  params.append('items', JSON.stringify(app.items));
  params.append('comments', JSON.stringify(comments));
  const res = await axios.post(url, params).then((res)=>{
    console.log(res);
    respp = res;
    complete();
    // 自由項目を、"$"で区切った文字列で取得
    var labels = app.getLabels();
    // Local Storageに保存
    setLocalStorage(app.userName, labels);

    // コメントサイトに移動
    submitSuccessed(res.data.total);

  }).catch(function (error) {
    // handle error
    console.log(error);
  });
  console.log(res);
  // fetchGas(url, option).then(response => {
  //   console.log(response);
  //   return response.json();
  // }).then(function(text) {
  //   // console.log(text);
  //   obj = JSON.parse(text || null);
  //   // alert(obj.msg);
  //   return obj;
  // }).then((res) => {
  //   console.log(JSON.stringify(res));
  //   // complete();
  //   // 自由項目を、"$"で区切った文字列で取得
  //   var labels = app.getLabels();
  //   // Local Storageに保存
  //   setLocalStorage(app.userName, labels);

  //   // コメントサイトに移動
  //   // submitSuccessed(comment);
  // });
  // fetchGas(url, option).then((res) => {
  //   console.log(JSON.stringify(res));
  //   // complete();
  //   // 自由項目を、"$"で区切った文字列で取得
  //   var labels = app.getLabels();
  //   // Local Storageに保存
  //   setLocalStorage(app.userName, labels);

  //   // コメントサイトに移動
  //   // submitSuccessed(comment);
  // });
  // google.script.run
  //   .withSuccessHandler(function(comment) { // 上手く値が返ってきた時
  //     complete();
  //     // 自由項目を、"$"で区切った文字列で取得
  //     var labels = app.getLabels();
  //     // Local Storageに保存
  //     setLocalStorage(app.userName, labels);

  //     // コメントサイトに移動
  //     submitSuccessed(comment);
  //   })
  //   .withFailureHandler(submitError) // 値が返ってこなかった時
  //   // .writeSpreadSheet(1611327600000, "ファイフ", "1班", "山下", app.items, comments);
  //   .writeSpreadSheet(app.firstDate, app.team, app.group, app.userName, app.items, comments);
}

function complete() {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
}

prevBtnSec.addEventListener("click", function(event){
  // event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
  // event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(event){
  // event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

// パスワード入力画面を表示
function showPassInput() {
  Swal.fire({
    title: "Enter Password",
    text: "Enter password to show control for admin.",
    input: "password",
  }).then((result) => {
    console.log("password has been entered: %s", result.value);
    if(result.value == "asdf") {
      app.showCtrl = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "don't use this except administrator.",
      });
    }
  });
}
