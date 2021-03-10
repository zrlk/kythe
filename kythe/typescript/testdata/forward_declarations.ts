export {}

//- @test defines/binding Test1
//- Test1.complete incomplete
function test(a:number):number;
//- @test defines/binding Test2
//- Test2.complete incomplete
function test(b:string):number;
//- @test defines/binding Test3
//- @test completes Test1
//- @test completes Test2
//- Test3.complete definition
function test(c:string|number):number {
    return 3;
}
