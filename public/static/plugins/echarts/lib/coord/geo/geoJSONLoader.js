
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = require("zrender/lib/core/util");

var each = _util.each;

var parseGeoJson = require("./parseGeoJson");

var _model = require("../../util/model");

var makeInner = _model.makeInner;

var fixNanhai = require("./fix/nanhai");

var fixTextCoord = require("./fix/textCoord");

var fixGeoCoord = require("./fix/geoCoord");

var fixDiaoyuIsland = require("./fix/diaoyuIsland");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Built-in GEO fixer.
var inner = makeInner();
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} mapRecord {specialAreas, geoJSON}
   * @param {string} nameProperty
   * @return {Object} {regions, boundingRect}
   */
  load: function (mapName, mapRecord, nameProperty) {
    var parsed = inner(mapRecord).parsed;

    if (parsed) {
      return parsed;
    }

    var specialAreas = mapRecord.specialAreas || {};
    var geoJSON = mapRecord.geoJSON;
    var regions; // https://jsperf.com/try-catch-performance-overhead

    try {
      regions = geoJSON ? parseGeoJson(geoJSON, nameProperty) : [];
    } catch (e) {
      throw new Error('Invalid geoJson format\n' + e.message);
    }

    fixNanhai(mapName, regions);
    each(regions, function (region) {
      var regionName = region.name;
      fixTextCoord(mapName, region);
      fixGeoCoord(mapName, region);
      fixDiaoyuIsland(mapName, region); // Some area like Alaska in USA map needs to be tansformed
      // to look better

      var specialArea = specialAreas[regionName];

      if (specialArea) {
        region.transformTo(specialArea.left, specialArea.top, specialArea.width, specialArea.height);
      }
    });
    return inner(mapRecord).parsed = {
      regions: regions,
      boundingRect: getBoundingRect(regions)
    };
  }
};

function getBoundingRect(regions) {
  var rect;

  for (var i = 0; i < regions.length; i++) {
    var regionRect = regions[i].getBoundingRect();
    rect = rect || regionRect.clone();
    rect.union(regionRect);
  }

  return rect;
}

module.exports = _default;
