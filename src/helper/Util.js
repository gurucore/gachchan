﻿"use strict"

/**
 * Old util class from 2017, will be merged to CommonHelper
 */
export default class Util {
  /**
   *
   * @param {*} min
   * @param {*} max
   */
  static GetRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /**
   * split string into array, remove empty entries, each output string is trimmed
   * "1,2,3 ,,, 4, 5 ,6" ==> [1,2,3,4,5,6]
   * @param {*} strCommaSeparated
   */
  static splitByCommaAndTrim(strCommaSeparated) {
    if (strCommaSeparated) {
      return strCommaSeparated
        .split(",")
        .filter(segment => segment)
        .map(e => e.trim())
    } else {
      return []
    }
  }

  /**
   * merge 2 arrays of entries and reduce to distinct
   * [1,2,3] & [2, 3, 4] ==> return [1,2,3,4]
   * @param {Array} arr1
   * @param {Array} arr2
   */
  static mergeAndDistinct(arr1, arr2) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }

    let distinctArrayOfRoles = arr1.concat(arr2).filter(onlyUnique)
    return distinctArrayOfRoles
  }

  /**
   * give you the Date object, from the jsonDateString (return from some API services)
   * @param {String} jsonDateString string of this format "/Date(2342353453434)/"
   */
  static parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace("/Date(", "").replace(")/", "")))
  }

  /**
   * Joins path segments.  Preserves initial "/" and resolves ".." and "."
   * Does not support using ".." to go above/outside the root.
   * This means that join("foo", "../../bar") will not resolve to "../bar"
   */
  static joinPath(/* path segments */) {
    // Split the inputs into a list of path commands.
    var parts = []
    for (var i = 0, l = arguments.length; i < l; i++) {
      parts = parts.concat(arguments[i].split("/"))
    }
    // Interpret the path commands to get the new resolved path.
    var newParts = []
    for (i = 0, l = parts.length; i < l; i++) {
      var part = parts[i]
      // Remove leading and trailing slashes
      // Also remove "." segments
      if (!part || part === ".") continue
      // Interpret ".." to pop the last segment
      if (part === "..") newParts.pop()
      // Push new path segments.
      else newParts.push(part)
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("")
    // Turn back into a single string path.
    return newParts.join("/") || (newParts.length ? "/" : ".")
  }

  /**
   * A simple function to get the dirname of a path
   * Trailing slashes are ignored. Leading slash is preserved.
   * @param {*} path
   */
  static dirname(path) {
    return join(path, "..")
  }
} // end class
