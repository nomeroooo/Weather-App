import { async } from 'regenerator-runtime';
import i01d from 'url:../img/01d.svg';
import i01n from 'url:../img/01n.svg';
import i02d from 'url:../img/02d.svg';
import i02n from 'url:../img/02n.svg';
import i03d from 'url:../img/03d.svg';
import i03n from 'url:../img/03n.svg';
import i04d from 'url:../img/04d.svg';
import i04n from 'url:../img/04n.svg';
import i09d from 'url:../img/09d.svg';
import i09n from 'url:../img/09n.svg';
import i10d from 'url:../img/10d.svg';
import i10n from 'url:../img/10n.svg';
import i11d from 'url:../img/11d.svg';
import i11n from 'url:../img/11n.svg';
import i13d from 'url:../img/13d.svg';
import i13n from 'url:../img/13n.svg';
import i50d from 'url:../img/50d.svg';
import i50n from 'url:../img/50n.svg';

import { TIMEOUT_SEC } from './config.js';

export const iconsHelper = {
  '01d': i01d,
  '01n': i01n,
  '02d': i02d,
  '02n': i02n,
  '03d': i03d,
  '03n': i03n,
  '04d': i04d,
  '04n': i04n,
  '09d': i09d,
  '09n': i09n,
  '10d': i10d,
  '10n': i10n,
  '11d': i11d,
  '11n': i11n,
  '13d': i13d,
  '13n': i13n,
  '50d': i50d,
  '50n': i50n,
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};
