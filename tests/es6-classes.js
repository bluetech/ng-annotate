// issue #3 (ng-annotate-patched) - Support for ES6 Classes

(function(){
  class ClassTest1 {
    constructor($log) {}
  }
  /** @ngInject */
  class ClassTest1_noargs {
    constructor() {}
  }
  /** @ngInject */
  class ClassTest1_annotated {
    constructor($log) {}
  }
  class ClassTest1_annotated_constructor {
    /** @ngInject */
    constructor($log) {}
  }
  class ClassTest1_prologue_directive {
    constructor($log) {
      "ngInject";
    }
  }

  let ClassTest2 = class {
    constructor($log) {}
  };
  /** @ngInject */
  let ClassTest2_noargs = class {
    constructor() {}
  };
  /** @ngInject */
  let ClassTest2_annotated = class {
    constructor($log) {}
  };
  let ClassTest2_annotated_expression = /** @ngInject */ class {
    constructor($log) {}
  };
  let ClassTest2_annotated_constructor = class {
    /** @ngInject */
    constructor($log) {}
  };
  let ClassTest2_prologue_directive = class {
    constructor($log) {
      "ngInject";
    }
  };

  let ClassTest3,
      ClassTest3_noargs,
      ClassTest3_annotated,
      ClassTest3_annotated_expression,
      ClassTest3_annotated_constructor,
      ClassTest3_prologue_directive;

  ClassTest3 = class {
    constructor($log) {}
  };
  /** @ngInject */
  ClassTest3_noargs = class {
    constructor() {}
  };
  /** @ngInject */
  ClassTest3_annotated = class {
    constructor($log) {}
  };
  ClassTest3_annotated_expression = /** @ngInject */ class {
    constructor($log) {}
  };
  ClassTest3_annotated_constructor = class {
    /** @ngInject */
    constructor($log) {}
  };
  ClassTest3_prologue_directive = class {
    constructor($log) {
      "ngInject";
    }
  };
})();
