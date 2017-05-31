(function () {
    'use strict';
    angular.module('App.tools')
    /**
     * @ngdoc service
     * @name App.tools.service:numberFormatFactory
     * @description
     * Tools to generate a pdf
     * @requires $log
     * @requires $filter
     */
        .factory('numberFormatFactory',
            function ($log, $locale) {

                $log.debug('numberFormatFactory loading');

                var factory = {};
                var integersLength = 12;
                var decimalsLength = 2;

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name onGroupSepEvent
                 * @description
                 * Handles the key event GROUP_SEP
                 * @params {String} value The number without group separation
                 * @params {Object} $element The element that have to show the number.
                 */
                factory.onGroupSepEvent = function (value, $element) {
                    var reg = new RegExp($locale.NUMBER_FORMATS.GROUP_SEP + '$', 'g');
                    $element.val(value.replace(reg, '') + $locale.NUMBER_FORMATS.DECIMAL_SEP);
                    if (value[value.length - 2] === $locale.NUMBER_FORMATS.DECIMAL_SEP) {
                        reg = new RegExp($locale.NUMBER_FORMATS.DECIMAL_SEP + '$', '');
                        $element.val(value.replace(reg, ''));
                    }
                    if (value.length === 1) {
                        $element.val('0' + $locale.NUMBER_FORMATS.DECIMAL_SEP);
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name onDecimalSepEvent
                 * @description
                 * Handles the key event DECIMAL_SEP
                 * @params {String} value The number without group separation
                 * @params {Object} $element The element that have to show the number.
                 */
                factory.onDecimalSepEvent = function (value, $element) {
                    if (value[value.length - 2] === $locale.NUMBER_FORMATS.DECIMAL_SEP) {
                        var reg = new RegExp($locale.NUMBER_FORMATS.DECIMAL_SEP + '$', '');
                        $element.val(value.replace(reg, ''));
                    }
                    if (value.length === 1) {
                        $element.val('0' + $locale.NUMBER_FORMATS.DECIMAL_SEP);
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name always0beforeXX
                 * @description
                 * Puts a 0 if the first character is a dot
                 * @params {String} integer The number without group separation
                 * @returns {String} The string parsed
                 */
                factory.always0beforeXX = function (integer) {
                    if (integer[0] === $locale.NUMBER_FORMATS.DECIMAL_SEP) {
                        return '0' + integer;
                    } else {
                        return integer;
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name limitIntegersLength
                 * @description
                 * Limits the integer part size
                 * @params {String} integer The integer number without group separation
                 * @returns {String} The string parsed
                 */
                factory.limitIntegersLength = function (integer) {
                    if (integer) {
                        return integer.substring(0, integersLength);
                    } else {
                        return integer;
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name limitDecimalsLength
                 * @description
                 * Limits the decimal part size
                 * @params {String} decimal The decimal number without group separation
                 * @returns {String} The string parsed
                 */
                factory.limitDecimalsLength = function (decimal) {
                    if (decimal) {
                        return decimal.substring(0, decimalsLength);
                    } else {
                        return decimal;
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name countCommas
                 * @description
                 * Limits the decimal part size
                 * @params {String} decimal The decimal number without group separation
                 * @returns {Integer} The number of commas in the string
                 */
                factory.countCommas = function ($element) {
                    var tmpComma = 0;
                    angular.forEach($element.val(), function (char) {
                        if (char === $locale.NUMBER_FORMATS.GROUP_SEP) {
                            tmpComma++;
                        }
                    });
                    return tmpComma;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name setCursor
                 * @description
                 * Set cursor to the correct position
                 * @params {Integer} currentComma Index of the current comma
                 * @params {Integer} tmpComma Index of the previous comma
                 * @params {Integer} start Index of the cursor
                 * @params {Integer} end Index of the cursor
                 * @params {Boolean} tabDetected If the tab is pressed
                 * @params {Object} $element The element that have to show the number
                 */
                factory.setCursor = function (currentComma, tmpComma, start, end, tabDetected, $element) {
                    if (!tabDetected) {
                        if (currentComma > tmpComma) {
                            $element[0].setSelectionRange(start + 1, end + 1);
                        } else {
                            $element[0].setSelectionRange(start, end);
                        }
                        if (currentComma < tmpComma) {
                            $element[0].setSelectionRange(start - 1, end - 1);
                        }
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.tools.service:numberFormatFactory
                 * @name updateValue
                 * @description
                 * Update value with the integer and decimal part.
                 * @params {String} integerParsed Integer value
                 * @params {String} decimal Decimal value
                 * @params {Object} $element The element that have to show the number
                 */
                factory.updateValue = function (integerParsed, decimal, $element) {
                    if (decimal || decimal === '') {
                        $element.val(integerParsed + $locale.NUMBER_FORMATS.DECIMAL_SEP + decimal);
                    } else {
                        $element.val(integerParsed);
                    }
                };

                return factory;
            });
}());
