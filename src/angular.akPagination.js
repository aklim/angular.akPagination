/**
 * angular.akPagination - AngularJS pagination module.
 *
 * Copyright 2017 Andrey Klimenko <andrey.iemail@gmail.com>
 */

(function () {
    angular
        .module('angular.akPagination', [])
        .directive('akPagination', akPaginationDirective)
        //.provider('paginationTemplate', paginationTemplateProvider)
        .run('$templateCache', paginationControlsTemplateInstaller);

    function akPaginationDirective() {

    }

    function paginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angular.akPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    /**
     * This provider allows global configuration of the template path used by the akPagination directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angular.akPagination.template';
        var templateString;

        /**
         * Set a templateUrl to be used by all instances of <ak-pagination>
         * @param {String} path
         */
        this.setPath = function(path) {
            templatePath = path;
        };

        /**
         * Set a string of HTML to be used as a template by all instances
         * of <ak-pagination>. If both a path *and* a string have been set,
         * the string takes precedence.
         * @param {String} str
         */
        this.setString = function(str) {
            templateString = str;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                },
                getString: function() {
                    return templateString;
                }
            };
        };

    }
})();