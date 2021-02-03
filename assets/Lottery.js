var names = ["卜沉", "丁坚", "丁勉", "上官云", "万大平", "于人豪", "于嫂", "不戒和尚",
    "长青子", "仇松年", "丹青生", "邓八公", "方人智", "方生", "方证", "风清扬",
    "计无施", "木高峰", "王伯奋", "王诚", "王二叔",
    "王夫人", "王家驹", "王家骏", "王元霸", "王仲强", "白二", "白熊", "丛不弃",
    "东方不败", "乐厚", "令狐冲", "宁中则", "平夫人", "平一指", "申人俊", "史镖头",
    "史登达", "司马大", "田伯光", "仪和", "仪琳", "仪清", "玉玑子",
    "玉磬子", "玉音子", "玉钟子", "左冷禅", "成不忧", "冲虚道长", "吉人通",
    "刘菁", "刘芹", "刘正风", "米为义", "农妇", "齐堂主",
    "曲非烟", "曲洋", "任我行", "英颚", "西宝", "向大年", "向问天", "陈七",
    "陈歪嘴", "迟百诚", "狄镖头", "狄修", "杜长老", "何三七", "季镖头",
    "劳德诺", "陆伯", "陆大有", "任盈盈", "沙天江", "秃笔翁", "吴柏英", "吴天德",
    "辛国梁", "严三星", "杨莲亭", "余沧海", "余人彦", "岳灵珊", "张夫人", "张金鏊",
    "定逸", "建除", "林平之", "林远图", "林震南", "罗人杰", "易国梓", "易师爷",
    "易堂主", "英白罗", "英长老", "岳不群", "郑镖头", "郑萼", "周孤桐", "费彬", "封不平",
    "洪人雄", "侯人英", "觉月", "施戴子", "施令威", "闻先生", "哑婆婆", "钟镇", "祝镖头",
    "祖千秋", "高克新", "高明根", "贾布", "贾人达", "莫大", "秦娟", "秦伟帮", "桑三娘", "桃干仙",
    "桃根仙", "桃花仙", "桃实仙", "桃叶仙", "桃枝仙", "陶钧", "崔镖头", "黄伯流",
    "黄国柏", "黄钟公", "梁发", "绿竹翁", "游迅", "葛长老",
    "黑白子", "黑熊", "鲁连荣", "舒奇", "童百熊", "鲍大楚", "解风", "蓝凤凰", "谭迪人", "震山子"];

cc.Class({
    extends: cc.Component,

    properties: {
        btn3Rank: { default: null, type: cc.Button },
        btn2Rank: { default: null, type: cc.Button },
        btn1Rank: { default: null, type: cc.Button },
        btn0Rank: { default: null, type: cc.Button },
        btnStart: { default: null, type: cc.Button },
        lblStart: { default: null, type: cc.Label },
        lblUser1: { default: null, type: cc.Label },
        lblUser2: { default: null, type: cc.Label },
        lblUser3: { default: null, type: cc.Label },
        lblUser4: { default: null, type: cc.Label },
        curNames: []
    },

    start() {
        // 当前是否在抽选状态
        this.isRunning = 0;
        // 奖项对应的单次抽选人数，本例子中，特等奖一人，一等奖 3 人，每次抽选 1 人，抽选 3 次
        // 二等奖 10 人 每次抽选 2 人，抽选 5 次，三等奖 20 人 每次抽选 4 人，抽选 5 次
        // 请设置为 1/2/4 之中的数值，需要一次抽 3 人请自行调整界面
        this.rankShowNames = [1, 1, 2, 4];
        // 各奖项抽选上限值，达到上限值时隐藏抽选按钮，防止用户误操作多抽一次，导致这些用户被排除出抽选名单
        // 考虑抽奖可能有临时加码情况，特等奖(一次抽取一个用户)抽取上限设为 100
        this.rankCount = [100, 3, 5, 5];
        // 初始抽选的奖项
        this.currentRank = 3;

        // 刷新计时器
        this.updateTimer = 0;
        // 0.1 秒刷新一次，可修改
        this.updateInterval = 0.1;
    },

    update(dt) {
        // 刷新率方法
        this.updateTimer += dt;
        if (this.updateTimer >= this.updateInterval) {
            this.updateTimer = 0;

            // 通过取随机姓名方法，获取到几个名字就将其显示到对应的 Label
            if (this.isRunning) {
                this.curNames = this.randomNum();
                if (this.curNames) {
                    this.lblUser1.string = this.curNames[0];
                    if (this.curNames.length > 1) {
                        this.lblUser2.string = this.curNames[1];
                    }
                    if (this.curNames.length == 4) {
                        this.lblUser3.string = this.curNames[2];
                        this.lblUser4.string = this.curNames[3];
                    }
                }
            }
        }
    },

    // 在姓名列表中取随机姓名方法
    randomNum() {
        let ret = [];
        // 当前要抽取几个名字
        let limitCount = this.rankShowNames[this.currentRank];
        // 复制一份临时抽取名单用于本次抽取
        let tempNames = names.slice(0);
        // 一次抽取多人时，要防止重复抽取到同一个名字，抽到时将其在临时抽取名单去掉
        for (let i = 0; i < limitCount; i++) {
            // 随机数生成方法
            let getName = [Math.floor(Math.random() * tempNames.length)];
            ret.push(tempNames[getName]);
            tempNames.splice(getName, 1);
        }
        return ret;
    },

    buttonStartPressed() {
        let limitCount = this.rankShowNames[this.currentRank];
        if (limitCount != 1 && limitCount != 2 && limitCount != 4) {
            console.log("请将 this.rankShowNames 中数值设置为 1/2/4");
            return;
        }
        // 改变抽选状态
        this.isRunning = 1 - this.isRunning;

        // 停止抽选情况
        if (this.isRunning == 0) {
            this.rankCount[this.currentRank]--;
            // 若达到该奖项的抽选次数，隐藏抽选按钮
            if (this.rankCount[this.currentRank] <= 0) {
                this.btnStart.node.active = false;
            }

            this.lblStart.string = "开始抽奖";
            console.log("奖项 " + this.currentRank + " 中奖人：" + this.curNames);

            // 将中奖人员排除出抽选列表
            for (let i = 0; i < this.curNames.length; i++) {
                for (let j = 0; j < names.length; j++) {
                    if (this.curNames[i] == names[j]) {
                        names.splice(j, 1);
                    }
                }
            }
        }
        // 开始抽选情况
        else {
            this.lblStart.string = "点击抽奖！";
        }
    },

    buttonRankPressed: function (event, customEventData) {
        // 切换奖项，仅在当前未在抽选时有效
        if (!this.isRunning) {
            // 当前抽选奖项，customEventData 的值需要在 Creator 编辑器中设置，当前按钮设置为 0/1/2/3 对应各奖项
            this.currentRank = customEventData;
            let limitCount = this.rankShowNames[customEventData];

            // 各奖项界面调整
            this.lblUser1.string = this.lblUser2.string = this.lblUser3.string = this.lblUser4.string = "YOU";
            this.lblUser1.node.active = this.lblUser2.node.active = this.lblUser3.node.active = this.lblUser4.node.active = true;
            this.lblUser1.node.x = -180;
            if (limitCount <= 2) {
                this.lblUser3.node.active = this.lblUser4.node.active = false;
                if (limitCount == 1) {
                    this.lblUser1.node.x = 0;
                    this.lblUser2.node.active = false;
                }
            }
            // 当前奖项是否抽完和显示抽选按钮
            if (this.rankCount[customEventData] == 0) {
                this.btnStart.node.active = false;
            }
            else {
                this.btnStart.node.active = true;
            }
        }
    }
})