import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useTransportationsHook from '../../utils/api/transportations'
import useContainersHook from '../../utils/api/containers'
import useSeaportsHook from '../../utils/api/seaports'
import useAirportsHook from '../../utils/api/airports'

import { Spinner, Pagination, Message, Confirm } from '../../components'
import {
  dynamicInputSelect,
  inputCheckBox,
  inputDate,
  inputMultipleCheckBox,
  inputNumber,
  inputText,
  staticInputSelect,
} from '../../utils/dynamicForm'
import TableView from '../../components/TableView'
import FormView from '../../components/FormView'
import { reversePriceFormat } from '../../utils/priceFormat'

const Transportations = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const {
    getTransportations,
    postTransportation,
    updateTransportation,
    deleteTransportation,
  } = useTransportationsHook({
    page,
    q,
  })
  const { getContainers } = useContainersHook({
    limit: 10000000,
  })
  const { getSeaports } = useSeaportsHook({
    limit: 10000000,
  })
  const { getAirports } = useAirportsHook({
    limit: 10000000,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const { data, isLoading, isError, error, refetch } = getTransportations
  const { data: containersData } = getContainers
  const { data: seaportsData } = getSeaports
  const { data: airportsData } = getAirports

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateTransportation

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteTransportation

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postTransportation

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPost, isSuccessUpdate])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (!q) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const searchHandler = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  // TableView
  const table = {
    header: [
      'Name',
      'Transportation',
      'Cargo',
      'Cost',
      'Price',
      'Departure Date',
      'Arrival Date',
      'Status',
    ],
    body: [
      'name',
      'transportationType',
      'cargoType',
      'cost',
      'price',
      'departureDate',
      'arrivalDate',
      'status',
    ],
    createdAt: 'createdAt',
    data: data,
  }

  const editHandler = (item) => {
    setId(item._id)

    table.body.map((t) => setValue(t, item[t]))
    setValue('departureAirport', item?.departureAirport?._id)
    setValue('arrivalAirport', item?.arrivalAirport?._id)
    setValue('departureSeaport', item?.departureSeaport?._id)
    setValue('arrivalSeaport', item?.arrivalSeaport?._id)
    setEdit(true)
    setValue(
      'container',
      item?.container?.map((c) => c?.container?._id)
    )
    setValue(
      'cost',
      item.container.map((c) => c?.cost)
    )
    setValue(
      'price',
      item.container.map((c) => c?.price)
    )
  }

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const name = 'Transportations List'
  const label = 'Transportation'
  const modal = 'transportation'
  const searchPlaceholder = 'Search by name'

  // FormView
  const formCleanHandler = () => {
    reset(), setEdit(false)
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          ...data,
        })
      : mutateAsyncPost(data)
  }

  const form = [
    inputText({
      register,
      errors,
      label: 'Name',
      name: 'name',
      placeholder: 'Enter name',
    }),
    staticInputSelect({
      register,
      errors,
      label: 'Transportation Type',
      name: 'transportationType',
      placeholder: 'Select transportation type',
      data: [
        { name: 'track' },
        { name: 'ship' },
        { name: 'train' },
        { name: 'plane' },
      ],
    }),

    staticInputSelect({
      register,
      errors,
      label: 'Cargo Type',
      name: 'cargoType',
      placeholder: 'Select cargo type',
      data: [{ name: 'FCL' }, { name: 'LCL' }, { name: 'AIR' }],
    }),
    watch().cargoType === 'FCL' && watch().transportationType === 'ship' ? (
      <div>
        {inputMultipleCheckBox({
          register,
          errors,
          label: 'Container',
          name: 'container',
          value: 'name',
          data: containersData?.data?.filter(
            (item) => item.status === 'active'
          ),
        })}
      </div>
    ) : (
      dynamicInputSelect({
        register,
        errors,
        label: 'Container',
        name: 'container',
        placeholder: 'Select container',
        value: 'name',
        data: containersData?.data?.filter((item) => item.status === 'active'),
      })
    ),

    <div key='cost-price' className='row'>
      <div className='col-6'>
        {inputText({
          register,
          errors,
          label: 'Cost',
          name: 'cost',
          placeholder: 'Enter cost container',
        })}
      </div>
      <div className='col-6'>
        {inputText({
          register,
          errors,
          label: 'Price',
          name: 'price',
          placeholder: 'Enter price container',
        })}
      </div>
    </div>,

    watch().cargoType === 'AIR' &&
      dynamicInputSelect({
        register,
        errors,
        label: 'Departure Airport',
        name: 'departureAirport',
        placeholder: 'Select departure airport',
        value: 'name',
        data: airportsData?.data?.filter(
          (item) =>
            item.status === 'active' && item._id !== watch().arrivalAirport
        ),
      }),
    watch().cargoType === 'AIR' &&
      dynamicInputSelect({
        register,
        errors,
        label: 'Arrival Airport',
        name: 'arrivalAirport',
        placeholder: 'Select arrival airport',
        value: 'name',
        data: airportsData?.data?.filter(
          (item) =>
            item.status === 'active' && item._id !== watch().departureAirport
        ),
      }),

    watch().cargoType !== 'AIR' &&
      dynamicInputSelect({
        register,
        errors,
        label: 'Departure Seaport',
        name: 'departureSeaport',
        placeholder: 'Select departure airport',
        value: 'name',
        data: seaportsData?.data?.filter(
          (item) =>
            item.status === 'active' && item._id !== watch().arrivalSeaport
        ),
      }),
    watch().cargoType !== 'AIR' &&
      dynamicInputSelect({
        register,
        errors,
        label: 'Arrival Seaport',
        name: 'arrivalSeaport',
        placeholder: 'Select arrival airport',
        value: 'name',
        data: seaportsData?.data?.filter(
          (item) =>
            item.status === 'active' && item._id !== watch().departureSeaport
        ),
      }),

    inputDate({
      register,
      errors,
      label: 'Departure Date',
      name: 'departureDate',
      placeholder: 'Enter departure date',
    }),
    inputDate({
      register,
      errors,
      label: 'Arrival Date',
      name: 'arrivalDate',
      placeholder: 'Enter arrival date',
    }),

    staticInputSelect({
      register,
      errors,
      label: 'Status',
      name: 'status',
      placeholder: 'Select status',
      data: [{ name: 'active' }, { name: 'inactive' }],
    }),
  ]

  const row = true
  const column = 'col-md-6 col-12'
  const modalSize = 'modal-lg'

  return (
    <>
      <Head>
        <title>Transportations</title>
        <meta property='og:title' content='Transportations' key='title' />
      </Head>

      {isSuccessDelete && (
        <Message variant='success'>
          {label} has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant='success'>
          {label} has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant='success'>
          {label} has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <div className='ms-auto text-end'>
        <Pagination data={table.data} setPage={setPage} />
      </div>

      <FormView
        edit={edit}
        formCleanHandler={formCleanHandler}
        form={form}
        watch={watch}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        modal={modal}
        label={label}
        column={column}
        row={row}
        modalSize={modalSize}
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <TableView
          table={table}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          searchHandler={searchHandler}
          isLoadingDelete={isLoadingDelete}
          name={name}
          label={label}
          modal={modal}
          setQ={setQ}
          q={q}
          searchPlaceholder={searchPlaceholder}
          searchInput={true}
          addBtn={true}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Transportations)), {
  ssr: false,
})
