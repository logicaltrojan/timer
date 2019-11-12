import timeDisplayer from "../../src/components/timeDisplayer";
import { mount , shallowMount} from "@vue/test-utils";
import CommonUtil from "../../src/CommonUtil";

describe("timeDisplayer" , () =>{

    const timerInfoArray = [
        {
            minute : 25,
            color : "blue"
        },
        {
            minute : 5,
            color : "red"
        }
    ];
    function simpleWrapperFactory(){
       return mount(timeDisplayer, {
            propsData : {
                timerInfoArray: timerInfoArray
            }
        });
    };


    it("transforms minute value to second and hold it", () =>{
        var wm = simpleWrapperFactory();

        expect(wm.vm.minuteSecondsArray[0]).toEqual(CommonUtil.minuteToSecond(timerInfoArray[0].minute));
        expect(wm.vm.minuteSecondsArray[1]).toEqual(CommonUtil.minuteToSecond(timerInfoArray[1].minute));

    });


    it("transforms second array props to hundred value" , ()=>{

        var wm = simpleWrapperFactory();

        var expectedValue = CommonUtil.calculatePercentageAsRoundedNumber(25*60, 30*60);
        var expectedValue2 = CommonUtil.calculatePercentageAsRoundedNumber( 5*60, 30*60);



        expect(wm.vm.secondPercentageArray[0]).toEqual(expectedValue);
        expect(wm.vm.secondPercentageArray[1]).toEqual(expectedValue2);


    });
    //TODO : MORE AGGRESSIVE TEST CASE NEEDED
    it("renders timer as much as element of timerMinuteArray", ()=>{

        var wm = simpleWrapperFactory();

        expect(wm.findAll("[role=progressbar]").length).toBe(timerInfoArray.length);


    });



    it("'s method calcuates rotate value of each timerInfo minute by its percentage value ", ()=>{

        var wm = simpleWrapperFactory();
        const testArray = [80, 20];
        const testArray2 = [75, 20, 5];
        const testArray3 = [100];


        let testResult = wm.vm.calculateRotateValueByPercentage(testArray);
        let testResult2 = wm.vm.calculateRotateValueByPercentage(testArray2);
        let testResult3 = wm.vm.calculateRotateValueByPercentage(testArray3);


        expect(testResult).toEqual([0, (360/100 * 80)]);
        expect(testResult2).toEqual([0, Math.round(360 / 100 * 75 ), Math.round(360 / 100 * 95)]);
        expect(testResult3).toEqual([0]);

   } );






});




