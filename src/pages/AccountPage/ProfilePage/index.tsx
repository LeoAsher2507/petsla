import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import Loading from 'src/components/Loading';
import AccountPageHeader from 'src/pages/accountPage/components/AccountPageHeader';
import { getUserInfoMethod } from 'src/services/user/userAction';
import { RootState } from 'src/stores/rootReducer';
import { EGender } from 'src/types/authTypes';
import { ERequestStatus } from 'src/types/commonType';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import { userInfoSchema } from 'src/utils/yup';
import './ProfilePage.scss';

const ProfilePage = () => {
  const { setShowDashboard } = useOutletContext<{
    setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const { userState, themeState, authState } = useAppSelector(
    (state: RootState) => state
  );

  const { currentUser, requestStatus } = userState;
  const { token } = authState;

  const { style } = themeState;
  const { t } = useTranslation();

  const [isEdit, setIsEdit] = useState(false);

  const defaultValues = {
    name: currentUser?.name || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    username: currentUser?.username || '',
    phoneNumber: currentUser?.phoneNumber || '',
    gender: EGender[currentUser?.gender || 3],
  };
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues,
  });

  const handleEditSaveBtnClick = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('gender', event.target.value);
  };

  React.useEffect(() => {
    dispatch(getUserInfoMethod());
  }, [dispatch]);

  useEffect(() => {
    form.reset({
      name: currentUser?.name || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      username: currentUser?.username || '',
      phoneNumber: currentUser?.phoneNumber || '',
      gender: EGender[currentUser?.gender || 2],
    });
  }, [currentUser, form]);

  return (
    <>
      {requestStatus === ERequestStatus.PENDING && <Loading />}
      <div className='profile-page'>
        <AccountPageHeader
          titleIcon={<i className='bi bi-person-fill'></i>}
          headerTitle='My Profile'
          btnTitle={isEdit ? 'Save' : 'Edit Profile'}
          setShowDashboard={setShowDashboard}
          handleBtnClick={handleEditSaveBtnClick}
        />

        <div className='profile-page-body'>
          <div className='common-info'>
            <Row>
              <Col xs={12} md={6} className='mt-4'>
                <div
                  className='user-ava-card shadow-sm rounded'
                  style={{ backgroundColor: style.backgroundColor }}>
                  <div className='user-ava-wrap'>
                    <div className='user-ava'>
                      <img
                        src={token ? Media.cuteCat : Media.noUser}
                        alt='User avatar'
                      />
                    </div>
                    <div className='name-wrap'>
                      <span className='full-name'> {currentUser?.name} </span>
                      <span className='username'>
                        {' '}
                        {currentUser?.username}{' '}
                      </span>
                    </div>
                  </div>
                  <div className='member-type'>Diamond User</div>
                </div>
              </Col>

              <Col xs={12} md={6} className='mt-4'>
                <div className='order-type-card-wrap'>
                  <div
                    className='order-card-item shadow-sm rounded'
                    style={{ backgroundColor: style.backgroundColor }}>
                    <span className='quantity'>10</span>
                    <span className='title'>Pending</span>
                  </div>

                  <div
                    className='order-card-item shadow-sm rounded'
                    style={{ backgroundColor: style.backgroundColor }}>
                    <span className='quantity'>3</span>
                    <span className='title'>Shipping</span>
                  </div>

                  <div
                    className='order-card-item shadow-sm rounded'
                    style={{ backgroundColor: style.backgroundColor }}>
                    <span className='quantity'>99</span>
                    <span className='title'>Delivered</span>
                  </div>

                  <div
                    className='order-card-item shadow-sm rounded'
                    style={{ backgroundColor: style.backgroundColor }}>
                    <span className='quantity'>0</span>
                    <span className='title'>Cancelled</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div
            className='personal-info mt-4 shadow-sm rounded p-4'
            style={{ backgroundColor: style.backgroundColor }}>
            <Form>
              <Form.Group className='mt-3 form-gr'>
                <Form.Label htmlFor='first-name'>
                  {t('label.firstName')}:{' '}
                </Form.Label>
                <Form.Control
                  id='first-name'
                  disabled={!isEdit}
                  type='text'
                  {...form.register('firstName')}
                />
              </Form.Group>

              <Form.Group className='mt-3 form-gr'>
                <Form.Label htmlFor='last-name'>
                  {t('label.lastName')}:
                </Form.Label>
                <Form.Control
                  id='last-name'
                  disabled={!isEdit}
                  type='text'
                  {...form.register('lastName')}
                />
              </Form.Group>

              <Form.Group className='mt-3 form-gr'>
                <Form.Label htmlFor='email'>Email:</Form.Label>
                <Form.Control
                  id='email'
                  disabled={!isEdit}
                  type='text'
                  {...form.register('email')}
                />
              </Form.Group>

              <Form.Group className='mt-3 form-gr'>
                <Form.Label htmlFor='phone-number'>Phone number: </Form.Label>
                <Form.Control
                  id='phone-number'
                  disabled={!isEdit}
                  type='text'
                  {...form.register('phoneNumber')}
                />
              </Form.Group>

              <Form.Group className='mt-3 form-gr'>
                <Form.Label>{t('label.gender.title')}: </Form.Label>
                <Form.Check>
                  <Form.Check.Input
                    disabled={!isEdit}
                    onChange={handleGenderChange}
                    defaultChecked={
                      form.getValues('gender') === EGender[EGender.MALE]
                    }
                    value={EGender.MALE}
                    name='gender'
                    type='radio'
                    id={`gender-${EGender.MALE}`}
                  />
                  <Form.Check.Label
                    className='gender-item'
                    htmlFor={`gender-${EGender.MALE}`}>
                    {EGender[EGender.MALE].toLowerCase()}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  <Form.Check.Input
                    disabled={!isEdit}
                    onChange={handleGenderChange}
                    defaultChecked={
                      form.getValues('gender') === EGender[EGender.FEMALE]
                    }
                    value={EGender.FEMALE}
                    name='gender'
                    type='radio'
                    id={`gender-${EGender.FEMALE}`}
                  />
                  <Form.Check.Label
                    className='gender-item'
                    htmlFor={`gender-${EGender.FEMALE}`}>
                    {EGender[EGender.FEMALE].toLowerCase()}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  <Form.Check.Input
                    disabled={!isEdit}
                    onChange={handleGenderChange}
                    defaultChecked={
                      form.getValues('gender') === EGender[EGender.OTHER]
                    }
                    value={EGender.OTHER}
                    name='gender'
                    type='radio'
                    id={`gender-${EGender.OTHER}`}
                  />
                  <Form.Check.Label
                    className='gender-item'
                    htmlFor={`gender-${EGender.OTHER}`}>
                    {EGender[EGender.OTHER].toLowerCase()}
                  </Form.Check.Label>
                </Form.Check>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
