import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import useOrdersHook from '../../../utils/api/orders'
import { Spinner, Message } from '../../../components'
import { useRouter } from 'next/router'
import { FaEdit, FaExclamationCircle } from 'react-icons/fa'
import moment from 'moment'
import FormView from '../../../components/FormView'
import {
  dynamicInputSelect,
  inputCheckBox,
  inputEmail,
  inputFile,
  inputNumber,
  inputTel,
  inputText,
  staticInputSelect,
} from '../../../utils/dynamicForm'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import useUploadHook from '../../../utils/api/upload'
import useTownsHook from '../../../utils/api/towns'
import useCommoditiesHook from '../../../utils/api/commodities'
import CustomFormView from '../../../components/CustomFormView'
import Tabs from '../../../features/order/Tabs'

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  const [file, setFile] = useState('')
  const [fileLink, setFileLink] = useState(null)
  const [selectedTransportation, setSelectedTransportation] = useState(null)
  const [selectContainer, setSelectContainer] = useState([])
  const [inputFields, setInputFields] = useState([
    {
      qty: 0,
      commodity: '',
      length: '',
      width: '',
      height: '',
    },
  ])

  const {
    getOrderDetails,
    updateOrderBuyer,
    updateOrderPickUp,
    updateOrderDropOff,
    updateOrderOther,
    updateOrderToConfirm,
    updateOrderToDelete,
  } = useOrdersHook({
    id,
  })
  const { getTowns } = useTownsHook({ limit: 1000000 })
  const { getCommodities } = useCommoditiesHook({ limit: 1000000 })

  const { postUpload } = useUploadHook()

  const { data, isLoading, isError, error } = getOrderDetails
  const { data: townsData } = getTowns
  const { data: commoditiesData } = getCommodities

  const {
    data: dataUpload,
    isLoading: isLoadingUpload,
    isError: isErrorUpload,
    error: errorUpload,
    mutateAsync: mutateAsyncUpload,
    isSuccess: isSuccessUpload,
  } = postUpload

  const {
    isLoading: isLoadingUpdateBuyer,
    isError: isErrorUpdateBuyer,
    error: errorUpdateBuyer,
    mutateAsync: mutateAsyncUpdateBuyer,
    isSuccess: isSuccessUpdateBuyer,
  } = updateOrderBuyer
  const {
    isLoading: isLoadingUpdatePickUp,
    isError: isErrorUpdatePickUp,
    error: errorUpdatePickUp,
    mutateAsync: mutateAsyncUpdatePickUp,
    isSuccess: isSuccessUpdatePickUp,
  } = updateOrderPickUp
  const {
    isLoading: isLoadingUpdateDropOff,
    isError: isErrorUpdateDropOff,
    error: errorUpdateDropOff,
    mutateAsync: mutateAsyncUpdateDropOff,
    isSuccess: isSuccessUpdateDropOff,
  } = updateOrderDropOff
  const {
    isLoading: isLoadingUpdateOther,
    isError: isErrorUpdateOther,
    error: errorUpdateOther,
    mutateAsync: mutateAsyncUpdateOther,
    isSuccess: isSuccessUpdateOther,
  } = updateOrderOther
  const {
    isLoading: isLoadingUpdateToConfirm,
    isError: isErrorUpdateToConfirm,
    error: errorUpdateToConfirm,
    mutateAsync: mutateAsyncUpdateToConfirm,
    isSuccess: isSuccessUpdateToConfirm,
  } = updateOrderToConfirm
  const {
    isLoading: isLoadingUpdateToDelete,
    isError: isErrorUpdateToDelete,
    error: errorUpdateToDelete,
    mutateAsync: mutateAsyncUpdateToDelete,
    isSuccess: isSuccessUpdateToDelete,
  } = updateOrderToDelete

  useEffect(() => {
    if (isSuccessUpload) {
      setFileLink(
        dataUpload &&
          dataUpload.filePaths &&
          dataUpload.filePaths[0] &&
          dataUpload.filePaths[0].path
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpload])

  useEffect(() => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      mutateAsyncUpload({ type: 'file', formData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const confirmOrderHandler = () => {
    mutateAsyncUpdateToConfirm({ _id: id })
  }
  const cancelOrderHandler = () => {
    mutateAsyncUpdateToDelete({ _id: id })
  }

  const editBuyerHandler = () => {
    setValueBuyer('buyerName', data?.buyer?.buyerName)
    setValueBuyer('buyerMobileNumber', data?.buyer?.buyerMobileNumber)
    setValueBuyer('buyerEmail', data?.buyer?.buyerEmail)
    setValueBuyer('buyerAddress', data?.buyer?.buyerAddress)
  }
  const editPickUpHandler = () => {
    setValuePickUp('pickUpWarehouse', data?.pickUp?.pickUpWarehouse)
    setValuePickUp('pickUpCity', data?.pickUp?.pickUpCity)
    setValuePickUp('pickUpAddress', data?.pickUp?.pickUpAddress)
    setValuePickUp('pickUpTown', data?.pickUp?.pickUpTown?._id)
  }
  const editDropOffHandler = () => {
    setValueDropOff('dropOffWarehouse', data?.dropOff?.dropOffWarehouse)
    setValueDropOff('dropOffCity', data?.dropOff?.dropOffCity)
    setValueDropOff('dropOffAddress', data?.dropOff?.dropOffAddress)
    setValueDropOff('dropOffTown', data?.dropOff?.dropOffTown?._id)
  }
  const editOtherHandler = () => {
    setValueOther('importExport', data?.other?.importExport)
    setValueOther(
      'isTemperatureControlled',
      data?.other?.isTemperatureControlled
    )
    setValueOther('isHasInvoice', data?.other?.isHasInvoice)
    setValueOther('isHasInvoice', data?.other?.isHasInvoice)

    if (data?.other?.isHasInvoice) {
      setFileLink(data?.other?.invoice)
    }
    setInputFields(data?.other?.containerLCL)

    setSelectedTransportation(data?.other?.transportation)
    setSelectContainer(data?.other?.containerFCL)

    setValueOther('commodity', data?.other?.commodity?._id)
    setValueOther('grossWeight', data?.other?.grossWeight)
    setValueOther('cargoDescription', data?.other?.cargoDescription)
    setValueOther('noOfPackages', data?.other?.noOfPackages)
  }

  const {
    register: registerBuyer,
    handleSubmit: handleSubmitBuyer,
    watch: watchBuyer,
    setValue: setValueBuyer,
    reset: resetBuyer,
    formState: { errors: errorsBuyer },
  } = useForm({
    defaultValues: {},
  })

  const {
    register: registerPickUp,
    handleSubmit: handleSubmitPickUp,
    watch: watchPickUp,
    setValue: setValuePickUp,
    reset: resetPickUp,
    formState: { errors: errorsPickUp },
  } = useForm({
    defaultValues: {},
  })

  const {
    register: registerDropOff,
    handleSubmit: handleSubmitDropOff,
    watch: watchDropOff,
    setValue: setValueDropOff,
    reset: resetDropOff,
    formState: { errors: errorsDropOff },
  } = useForm({
    defaultValues: {},
  })

  const {
    register: registerOther,
    handleSubmit: handleSubmitOther,
    watch: watchOther,
    setValue: setValueOther,
    reset: resetOther,
    formState: { errors: errorsOther },
  } = useForm({
    defaultValues: {},
  })

  const formBuyer = [
    inputText({
      register: registerBuyer,
      errors: errorsBuyer,
      label: 'Name',
      name: 'buyerName',
      placeholder: 'Enter name',
    }),
    inputTel({
      register: registerBuyer,
      errors: errorsBuyer,
      label: 'Mobile',
      name: 'buyerMobileNumber',
      placeholder: 'Enter mobile',
    }),
    inputEmail({
      register: registerBuyer,
      errors: errorsBuyer,
      label: 'Email',
      name: 'buyerEmail',
      placeholder: 'Enter email',
    }),
    inputText({
      register: registerBuyer,
      errors: errorsBuyer,
      label: 'Address',
      name: 'buyerAddress',
      placeholder: 'Enter address',
    }),
  ]

  const formPickUp = [
    inputText({
      register: registerPickUp,
      errors: errorsPickUp,
      label: 'Warehouse',
      name: 'pickUpWarehouse',
      placeholder: 'Enter warehouse',
    }),
    inputText({
      register: registerPickUp,
      errors: errorsPickUp,
      label: 'City',
      name: 'pickUpCity',
      placeholder: 'Enter city',
    }),
    inputText({
      register: registerPickUp,
      errors: errorsPickUp,
      label: 'Address',
      name: 'pickUpAddress',
      placeholder: 'Enter address',
    }),
    dynamicInputSelect({
      register: registerPickUp,
      errors: errorsPickUp,
      label: 'PickUp town',
      name: 'pickUpTown',
      value: 'name',
      data: townsData?.data?.filter((town) =>
        town.status === 'active' && data?.other?.transportationType === 'plane'
          ? town?.airport?._id === data?.pickUp?.pickUpAirport?._id
          : town?.seaport?._id === data?.pickUp?.pickUpSeaport?._id
      ),
    }),
  ]

  const formDropOff = [
    inputText({
      register: registerDropOff,
      errors: errorsDropOff,
      label: 'Warehouse',
      name: 'dropOffWarehouse',
      placeholder: 'Enter warehouse',
    }),
    inputText({
      register: registerDropOff,
      errors: errorsDropOff,
      label: 'City',
      name: 'dropOffCity',
      placeholder: 'Enter city',
    }),
    inputText({
      register: registerDropOff,
      errors: errorsDropOff,
      label: 'Address',
      name: 'dropOffAddress',
      placeholder: 'Enter address',
    }),
    dynamicInputSelect({
      register: registerDropOff,
      errors: errorsDropOff,
      label: 'DropOff town',
      name: 'dropOffTown',
      value: 'name',
      data: townsData?.data?.filter((town) =>
        town.status === 'active' && data?.other?.transportationType === 'plane'
          ? town?.airport?._id === data?.dropOff?.dropOffAirport?._id
          : town?.seaport?._id === data?.dropOff?.dropOffSeaport?._id
      ),
    }),
  ]

  const seaFreightKG =
    data?.other?.cargoType === 'FCL' &&
    selectContainer?.reduce(
      (acc, curr) =>
        acc + curr?.container?.container?.details?.seaFreight * curr.quantity,
      0
    )

  const formOther = [
    staticInputSelect({
      register: registerOther,
      errors: errorsOther,
      label: 'Import/Export',
      name: 'importExport',
      data: [{ name: 'Import' }, { name: 'Export' }],
    }),
    inputCheckBox({
      register: registerOther,
      errors: errorsOther,
      name: 'isTemperatureControlled',
      isRequired: false,
      label:
        'My cargo is not temperature-controlled and does not include any hazardous or personal goods',
    }),
    inputCheckBox({
      register: registerOther,
      errors: errorsOther,
      name: 'isHasInvoice',
      label: 'Do you have an invoice?',
      isRequired: false,
    }),

    fileLink && (
      <div key={'fileLink'} className='text-warning'>
        This order has already uploaded invoice, just click submit button if you
        don not what upload new one again
      </div>
    ),

    watchOther().isHasInvoice &&
      inputFile({
        register: registerOther,
        errors: errorsOther,
        name: 'invoiceFile',
        label: 'Upload Invoice',
        isRequired: false,
        setFile,
      }),

    dynamicInputSelect({
      register: registerOther,
      errors: errorsOther,
      label: 'Commodity *',
      name: 'commodity',
      value: 'name',
      data:
        commoditiesData &&
        commoditiesData?.data?.filter(
          (commodity) => commodity.status === 'active'
        ),
    }),
    inputNumber({
      register: registerOther,
      errors: errorsOther,
      name: 'noOfPackages',
      label: 'No. of Packages',
      placeholder: 'Enter number of packages',
    }),
    inputNumber({
      register: registerOther,
      errors: errorsOther,
      name: 'grossWeight',
      label: 'Gross Weight as KG',
      max: seaFreightKG,
      placeholder: 'Enter gross weight as KG',
    }),
    inputText({
      register: registerOther,
      errors: errorsOther,
      name: 'cargoDescription',
      label: 'Cargo Description',
      placeholder: 'Enter cargo description',
    }),
  ]

  const row = false
  const column = 'col-md-6 col-12'
  const modalSize = 'modal-md'

  const labelBuyer = 'Buyer'
  const modalBuyer = 'buyer'

  const labelPickUp = 'Pick-up'
  const modalPickUp = 'pickUp'

  const labelDropOff = 'Drop-off'
  const modalDropOff = 'dropOff'

  const labelOther = 'Other'
  const modalOther = 'other'

  const formCleanHandler = () => {
    resetBuyer()
    resetPickUp()
    resetDropOff()
    resetOther()
    setFileLink(null)
    setSelectedTransportation(null)
    setSelectContainer([])
    setInputFields([
      {
        qty: 0,
        commodity: '',
        length: '',
        width: '',
        height: '',
      },
    ])
  }

  useEffect(() => {
    if (
      isSuccessUpdateBuyer ||
      isSuccessUpdatePickUp ||
      isSuccessUpdateDropOff ||
      isSuccessUpdateOther ||
      isSuccessUpdateToConfirm ||
      isSuccessUpdateToDelete
    )
      formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccessUpdateBuyer,
    isSuccessUpdatePickUp,
    isSuccessUpdateDropOff,
    isSuccessUpdateOther,
    isSuccessUpdateToConfirm,
    isSuccessUpdateToDelete,
  ])

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      {
        qty: '',
        commodity: '',
        length: '',
        width: '',
        height: '',
      },
    ])
  }

  const handleRemoveField = (index) => {
    const list = [...inputFields]
    list.splice(index, 1)
    setInputFields(list)
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const old = inputFields[index]
    const updated = { ...old, [name]: value }
    var list = [...inputFields]
    list[index] = updated
    setInputFields(list)
  }

  const addContainer = (container) => {
    const existed = selectContainer.find(
      (c) => c.container?._id === container.container?._id
    )
    if (existed) {
      const newSelectContainer = selectContainer.map((c) => {
        if (c.container?._id === container.container?._id) {
          return {
            ...container,
            quantity: Number(c.quantity) + 1,
          }
        }
        return c
      })
      setSelectContainer(newSelectContainer)
    } else {
      setSelectContainer([...selectContainer, { ...container, quantity: 1 }])
    }
  }

  const removeContainer = (container) => {
    const newSelectContainer = selectContainer.map((c) => {
      if (c.container?._id === container.container?._id && c.quantity > 1) {
        return {
          ...container,
          quantity: Number(c.quantity) - 1,
        }
      }
      if (
        c.container?._id === container.container?._id &&
        Number(c.quantity) === 1
      ) {
        return null
      }
      return c
    })

    setSelectContainer(newSelectContainer.filter((f) => f !== null))
  }

  const submitHandlerBuyer = (data) => {
    mutateAsyncUpdateBuyer({ ...data, _id: id })
  }
  const submitHandlerPickUp = (data) => {
    mutateAsyncUpdatePickUp({ ...data, _id: id })
  }

  const submitHandlerDropOff = (data) => {
    mutateAsyncUpdateDropOff({ ...data, _id: id })
  }
  const submitHandlerOther = (dataObj) => {
    mutateAsyncUpdateOther({
      ...dataObj,
      invoice: fileLink,
      _id: id,
      containerLCL: inputFields,
      USED_CBM: data?.price?.USED_CBM,
      transportation: selectedTransportation,
      containerFCL: selectContainer,
    })
  }

  const TOTAL_CBM = inputFields
    ?.reduce(
      (acc, curr) => acc + (curr.length * curr.width * curr.height) / 1000,
      0
    )
    ?.toFixed(2)

  const USED_CBM = data?.price?.USED_CBM + Number(TOTAL_CBM)
  const DEFAULT_CAPACITY = Number(
    data?.other?.transportation?.container[0]?.container?.details?.CBM
  )
  const AVAILABLE_CBM = DEFAULT_CAPACITY - USED_CBM

  return (
    <>
      <Head>
        <title>Booking Details {data?.trackingNo}</title>
        <meta
          property='og:title'
          content={`Booking Details ${data?.trackingNo}`}
          key='title'
        />
      </Head>

      {isErrorUpload && <Message variant='danger'>{errorUpload}</Message>}

      {isSuccessUpdateBuyer && (
        <Message variant='success'>
          Buyer details has been updated successfully
        </Message>
      )}
      {isErrorUpdateBuyer && (
        <Message variant='danger'>{errorUpdateBuyer}</Message>
      )}

      {isSuccessUpdatePickUp && (
        <Message variant='success'>
          Pick up details has been updated successfully
        </Message>
      )}
      {isErrorUpdatePickUp && (
        <Message variant='danger'>{errorUpdatePickUp}</Message>
      )}

      {isSuccessUpdateDropOff && (
        <Message variant='success'>
          Drop off details has been updated successfully
        </Message>
      )}
      {isErrorUpdateDropOff && (
        <Message variant='danger'>{errorUpdateDropOff}</Message>
      )}

      {isSuccessUpdateOther && (
        <Message variant='success'>
          Other details has been updated successfully
        </Message>
      )}
      {isErrorUpdateOther && (
        <Message variant='danger'>{errorUpdateOther}</Message>
      )}

      {isSuccessUpdateToConfirm && (
        <Message variant='success'>
          Order has been confirmed successfully
        </Message>
      )}
      {isErrorUpdateToConfirm && (
        <Message variant='danger'>{errorUpdateToConfirm}</Message>
      )}

      {isSuccessUpdateToDelete && (
        <Message variant='success'>
          Order has been cancelled successfully
        </Message>
      )}
      {isErrorUpdateToDelete && (
        <Message variant='danger'>{errorUpdateToDelete}</Message>
      )}

      {/* Buyer Modal Form */}
      <FormView
        edit={true}
        formCleanHandler={formCleanHandler}
        form={formBuyer}
        watch={watchBuyer}
        isLoadingUpdate={isLoadingUpdateBuyer}
        isLoadingPost={false}
        handleSubmit={handleSubmitBuyer}
        submitHandler={submitHandlerBuyer}
        modal={modalBuyer}
        label={labelBuyer}
        column={column}
        row={row}
        modalSize={modalSize}
      />

      {/* PickUp Modal Form */}
      <FormView
        edit={true}
        formCleanHandler={formCleanHandler}
        form={formPickUp}
        watch={watchPickUp}
        isLoadingUpdate={isLoadingUpdatePickUp}
        isLoadingPost={false}
        handleSubmit={handleSubmitPickUp}
        submitHandler={submitHandlerPickUp}
        modal={modalPickUp}
        label={labelPickUp}
        column={column}
        row={row}
        modalSize={modalSize}
      />

      {/* DropOff Modal Form */}
      <FormView
        edit={true}
        formCleanHandler={formCleanHandler}
        form={formDropOff}
        watch={watchDropOff}
        isLoadingUpdate={isLoadingUpdateDropOff}
        isLoadingPost={false}
        handleSubmit={handleSubmitDropOff}
        submitHandler={submitHandlerDropOff}
        modal={modalDropOff}
        label={labelDropOff}
        column={column}
        row={row}
        modalSize={modalSize}
      />

      {/* Other Modal Form */}
      <CustomFormView
        edit={true}
        formCleanHandler={formCleanHandler}
        form={formOther}
        watch={watchOther}
        isLoadingUpdate={isLoadingUpdateOther}
        isLoadingPost={isLoadingUpload}
        handleSubmit={handleSubmitOther}
        submitHandler={submitHandlerOther}
        modal={modalOther}
        label={labelOther}
        column={'col-12'}
        row={true}
        modalSize={'modal-lg'}
        inputFields={inputFields}
        handleAddField={handleAddField}
        handleInputChange={handleInputChange}
        handleRemoveField={handleRemoveField}
        commoditiesData={commoditiesData}
        AVAILABLE_CBM={AVAILABLE_CBM}
        DEFAULT_CAPACITY={DEFAULT_CAPACITY}
        USED_CBM={USED_CBM}
        selectedTransportation={selectedTransportation}
        cargoType={data?.other?.cargoType}
        selectContainer={selectContainer}
        removeContainer={removeContainer}
        addContainer={addContainer}
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='bg-light p-3 my-2'>
          <div className='alert alert-warning'>
            <FaExclamationCircle className='mb-1 me-2' />
            You can not edit this order after confirmed
          </div>
          <div className='row'>
            <div className='col-lg-3 col-md-4 col-12'>
              <h6>Shipment Binder </h6>
              <p className='fw-bold'>{data?.trackingNo}</p>
              <p className='fw-bold'>
                TOTAL PRICE:{' '}
                <span className='bg-dark text-light p-1 rounded-pill'>
                  {data?.price?.totalPrice}
                </span>{' '}
              </p>
            </div>
            <div className='col-lg-3 col-md-4 col-12'>
              <h6>Transporter </h6>
              <p>{data?.other?.transportation?.name}</p>
            </div>
            <div className='col-lg-3 col-md-4 col-12'>
              <h6>
                Departing on{' '}
                {moment(data?.other?.transportation?.departureDate).format(
                  'll'
                )}
              </h6>
              <p>
                {data?.pickUp?.pickUpSeaport?.name ||
                  data?.pickUp?.pickUpAirport?.name}
                , {data?.pickUp?.pickUpCountry?.name}
              </p>
            </div>
            <div className='col-lg-3 col-md-4 col-12'>
              <h6>
                Arriving on{' '}
                {moment(data?.other?.transportation?.arrivalDate).format('ll')}
              </h6>
              <p>
                {data?.dropOff?.dropOffSeaport?.name ||
                  data?.dropOff?.dropOffAirport?.name}
                , {data?.dropOff?.dropOffCountry?.name}
              </p>
            </div>
          </div>

          <Tabs
            data={data}
            confirmOrderHandler={confirmOrderHandler}
            FaEdit={FaEdit}
            modalBuyer={modalBuyer}
            editBuyerHandler={editBuyerHandler}
            modalPickUp={modalPickUp}
            editPickUpHandler={editPickUpHandler}
            modalDropOff={modalDropOff}
            editDropOffHandler={editDropOffHandler}
            modalOther={modalOther}
            editOtherHandler={editOtherHandler}
            cancelOrderHandler={cancelOrderHandler}
            isLoadingUpdateToConfirm={isLoadingUpdateToConfirm}
            isLoadingUpdateToDelete={isLoadingUpdateToDelete}
          />
        </div>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Details)), {
  ssr: false,
})
