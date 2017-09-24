// issue #3 (ng-annotate-patched) - Support for ES6 Classes

(function(){
    class ClassTest1 {
        constructor($log) {}
    }
    /** @ngInject */
    class ClassTest1_annotated {
        constructor($log) {}
    }
    ClassTest1_annotated.$inject = ["$log"];
    class ClassTest1_annotated_constructor {
        /** @ngInject */
        constructor($log) {}
    }
    ClassTest1_annotated_constructor.$inject = ["$log"];
    class ClassTest1_prologue_directive {
        constructor($log) {
            "ngInject";
        }
    }
    ClassTest1_prologue_directive.$inject = ["$log"];

    let ClassTest2 = class {
        constructor($log) {}
    };
    /** @ngInject */
    let ClassTest2_annotated = class {
        constructor($log) {}
    };
    ClassTest2_annotated.$inject = ["$log"];
    let ClassTest2_annotated_expression = /** @ngInject */ ["$log", class {
        constructor($log) {}
    }];
    let ClassTest2_annotated_constructor = ["$log", class {
        /** @ngInject */
        constructor($log) {}
    }];
    let ClassTest2_prologue_directive = ["$log", class {
        constructor($log) {
            "ngInject";
        }
    }];

    let ClassTest3,
        ClassTest3_annotated,
        ClassTest3_annotated_expression,
        ClassTest3_annotated_constructor,
        ClassTest3_prologue_directive;

    ClassTest3 = class {
        constructor($log) {}
    };
    /** @ngInject */
    ClassTest3_annotated = class {
        constructor($log) {}
    };
    ClassTest3_annotated.$inject = ["$log"];
    ClassTest3_annotated_expression = /** @ngInject */ ["$log", class {
        constructor($log) {}
    }];
    ClassTest3_annotated_constructor = class {
        /** @ngInject */
        constructor($log) {}
    };
    ClassTest3_annotated_constructor.$inject = ["$log"];
    ClassTest3_prologue_directive = class {
        constructor($log) {
            "ngInject";
        }
    };
    ClassTest3_prologue_directive.$inject = ["$log"];
})();
