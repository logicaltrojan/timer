import timeDisplayer from "../../src/components/timeDisplayer";
import { mount , shallowMount} from "@vue/test-utils";
import CommonUtil from "../../src/CommonUtil";


jest.useFakeTimers();

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

    const sampleColor = [
        "blue",
        "red",
        "green",
        "purple",
        "black",
        "yellow"
    ];

    function timerInfoFactory(timerMinuteArray){
        var timerInfoArray = [];

        for(var idx in timerMinuteArray){
            timerInfoArray.push({
                minute : timerMinuteArray[idx],
                color : sampleColor[idx]
            })
        }

        return timerInfoArray;
    }

    function simpleWrapperFactory(timerMinuteArray){
       return mount(timeDisplayer, {
            propsData : {
                timerInfoArray: timerInfoFactory(timerMinuteArray)
            }
        });
    };


    it("transforms minute value to second", () =>{
        var wm = simpleWrapperFactory([25,5]);

        expect(wm.vm.msArray[0]).toEqual(CommonUtil.minuteToSecond(timerInfoArray[0].minute));
        expect(wm.vm.msArray[1]).toEqual(CommonUtil.minuteToSecond(timerInfoArray[1].minute));

    });

    it("transforms second array props to hundred value" , ()=>{

        var wm = simpleWrapperFactory([25,5]);

        var expectedValue = CommonUtil.calculatePercentageAsRoundedNumber(25*60, 30*60);
        var expectedValue2 = CommonUtil.calculatePercentageAsRoundedNumber( 5*60, 30*60);



        expect(wm.vm.secondPercentageArray[0]).toEqual(expectedValue);
        expect(wm.vm.secondPercentageArray[1]).toEqual(expectedValue2);


    });
    //TODO : MORE AGGRESSIVE TEST CASE NEEDED
    it("renders timer as much as element of timerMinuteArray", ()=>{


        var wm = simpleWrapperFactory([25,5]);

        expect(wm.findAll("[role=progressbar]").length).toBe(timerInfoArray.length);


    });

    it("second percentageArray is changed if miunteSecondsArray change", () => {

        var wm = simpleWrapperFactory([20,5]);


        var beforePercentage = wm.vm.secondPercentageArray[0];
        var beforeSecond= wm.vm.msArray[0];

        wm.setProps({
            timerInfoArray: timerInfoFactory([19, 5])

        });


        expect(wm.vm.msArray[0]).toBeLessThan(beforeSecond);
        expect(wm.vm.secondPercentageArray[0]).toBeLessThan(beforePercentage);




    });



    it("'s method calcuates rotate value of each timerInfo minute by its percentage value ", ()=>{

        var wm = simpleWrapperFactory([25,5]);
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


    it("s rotateValue transforms its timer rotate value to vuetify js's progress bar rotate prop", ()=>{

        var wm = simpleWrapperFactory([25,5]);

        expect(wm.vm.rotateValueTransformer(0)).toEqual(-90);
        expect(wm.vm.rotateValueTransformer(90)).toEqual(360);
        expect(wm.vm.rotateValueTransformer(180)).toEqual(90);
        expect(wm.vm.rotateValueTransformer(270)).toEqual(180);



    });

    it('increase its msValueArray one by one second', () =>{
        var wrapper = simpleWrapperFactory([25,5]);


        expect(wrapper.vm.msValueArray).toEqual([0, 0]);


        jest.advanceTimersByTime(9000);


        expect(wrapper.vm.msValueArray[0]).toEqual(9);


    });

    it('initilize percentage value array with 0 , length of timerInfoArray', ()=>{
        var wrapper = simpleWrapperFactory([25, 5 , 3, 4]);

        expect(wrapper.vm.percentageValueArray).toEqual([0,0,0,0]);
    });




    it('total sum of second has to be unmodified when timer starts', () =>{
        var wrapper = simpleWrapperFactory([25,5]);


        expect(wrapper.vm.totalSumOfTimerSeconds).toEqual(25*60+5*60);

        jest.advanceTimersByTime(3000);


        expect(wrapper.vm.totalSumOfTimerSeconds).toEqual(25*60+5*60);

    })


    it("one timer end, proceed the percentage stops and go to next timer", () =>{
        var wrapper = simpleWrapperFactory([10,5]);

        expect(wrapper.vm.runningTimerIndex).toEqual(0);
        jest.advanceTimersByTime(10*60*1000 + 3000);

        expect(wrapper.vm.msValueArray[0]).toEqual(10*60);
        expect(wrapper.vm.msValueArray[1]).toBeLessThan(5*60);
        expect(wrapper.vm.runningTimerIndex).toEqual(1);


    })





});




