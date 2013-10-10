'use strict';

angular.module('discovery')
  .factory('WordListService', function () {
    var wordList = [];
    var _index = 0;

    _setupWordList();

    return {
      getAllWords: function () {
        return wordList;
      },
      getWord: function (index) {
        return wordList[index];
      },
      save: function (word) {
        wordlist[i] = word;
      },
      next: function () {
        // do logic to find next
        // make sure we are in bounds of array
        _index++;
        return wordList[_index];
      },
      previous: function () {
        // do logic to find prev
        // make sure we are in bounds of array
        _index--;
        return wordList[_index];
      }
    };

    function _setupWordList() {
      for (var i = 0; i < 25; i++) {
        wordList.push({
          id: i,
          english: 'English Word ' + i,
          spanish: 'Spanish Word ' + i,
          pronunciation: 'Pronunciation ' + i,
          count: 0,
          skip: false
        });
      }
    }
  });