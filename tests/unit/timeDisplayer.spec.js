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


    it("transforms time array props to hundred value" , ()=>{

        var wm = simpleWrapperFactory();

        var expectedValue = CommonUtil.calculatePercentageAsRoundedNumber(25, 30)
        var expectedValue2 = CommonUtil.calculatePercentageAsRoundedNumber( 5, 30);



        expect(wm.vm.minutePercentageArray[0]).toEqual(expectedValue);
        expect(wm.vm.minutePercentageArray[1]).toEqual(expectedValue2);


    });

    it("renders timer as much as element of timerMinuteArray", ()=>{

        var wm = simpleWrapperFactory();

        expect(wm.findAll("[role=progressbar]").length).toBe(timerInfoArray.length);


    });

    it("transforms minute value to second and hold it", () =>{
        var wm = simpleWrapperFactory();

        expect(wm.vm.minuteSecondsArray[0]).toEqual(CommonUtil.minuteToSecond(timerInfoArray[0].minute));
        expect(wm.vm.minuteSecondsArray[1]).toEqual(CommonUtil.minuteToSecond(timerInfoArray[1].minute));

    });




});




