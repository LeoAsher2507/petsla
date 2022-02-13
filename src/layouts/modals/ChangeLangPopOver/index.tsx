import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/stores/rootReducer';
import { ELanguage } from 'src/types/commonType';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './ChangeLangPopOver.scss';

const ChangeLangPopOver = () => {
  const { t, i18n } = useTranslation();

  const { style } = useAppSelector((state: RootState) => state.themeState);

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLang = i18n.language;

  return (
    <OverlayTrigger
      rootClose={true}
      trigger={'click'}
      placement='bottom'
      overlay={
        <Popover
          style={{ backgroundColor: style.backgroundColor }}
          className='change-lang-pop-over'
          id={`popover-positioned-bottom`}>
          <Popover.Body style={{ color: style.color }}>
            <ul className='lang-list'>
              <li
                className='lang-option'
                onClick={() => handleChangeLang(ELanguage.ENGLISH)}>
                <div
                  className='lang-thumbnail'
                  style={{ backgroundImage: `url(${Media.enFlag})` }}></div>
                <span className='lang-tt'> {t('languageTitle.en')} </span>
              </li>
              <li
                className='lang-option'
                onClick={() => handleChangeLang(ELanguage.VIETNAMESE)}>
                <div
                  className='lang-thumbnail'
                  style={{ backgroundImage: `url(${Media.vnFlag})` }}></div>
                <span className='lang-tt'> {t('languageTitle.vn')} </span>
              </li>
            </ul>
          </Popover.Body>
        </Popover>
      }>
      <div
        className='change-lang-btn lang-thumbnail'
        style={{
          backgroundImage: `url(${
            currentLang === ELanguage.ENGLISH ? Media.enFlag : Media.vnFlag
          })`,
        }}></div>
    </OverlayTrigger>
  );
};

export default ChangeLangPopOver;
