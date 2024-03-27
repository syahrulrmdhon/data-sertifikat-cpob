import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { getTokenAuth } from "../utils/auth-token";
import { getCertificates } from "../utils/certificates";

const TableCertificatePage = () => {
  useEffect(() => {
    proceedToken()
      .then((res) => {
        const token = res.data;
        return getCertificate(token);
      })
      .then((resData) => setDataCertificate(resData.data))
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [dataToken, setDataToken] = useState({});
  const proceedToken = () => {
    const res = getTokenAuth();
    return res;
  };
  const getCertificate = (token) => {
    setIsLoading(true);
    const resData = getCertificates(token, {
      meta: "total_count",
      limit: "99999",
    });
    return resData;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [dataCertificates, setDataCertificate] = useState([]);
  console.log("dataCertificates: ", dataCertificates);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama: { value: null, matchMode: FilterMatchMode.CONTAINS },
    alamat: { value: null, matchMode: FilterMatchMode.CONTAINS },
    propinsi: { value: null, matchMode: FilterMatchMode.CONTAINS },
    jenis_permohonan: { value: null, matchMode: FilterMatchMode.CONTAINS },
    no_sertifikat: { value: null, matchMode: FilterMatchMode.CONTAINS },
    jenis_sediaan: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tanggal_terbit: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tanggal_berlaku: { value: null, matchMode: FilterMatchMode.CONTAINS },
    jenis_produk: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <DataTable
        value={dataCertificates}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        removableSort
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={isLoading}
        header={header}
        emptyMessage="No customers found."
      >
        <Column
          field="nama"
          header="Nama"
          filter
          sortable
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="alamat"
          header="Alamat"
          filter
          sortable
          filterPlaceholder="Search by alamat"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="propinsi"
          header="Provinsi"
          filter
          sortable
          filterPlaceholder="Search by Provinsi"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="jenis_permohonan"
          header="Jenis Permohonan"
          filter
          sortable
          filterPlaceholder="Search by jenis permohonan"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="no_sertifikat"
          header="Nomor Sertifikat"
          filter
          sortable
          filterPlaceholder="Search by nomor sertifikat"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="jenis_sediaan"
          header="Jenis Sediaan"
          filter
          sortable
          filterPlaceholder="Search by jenis sediaan"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="tanggal_terbit"
          header="Tanggal Terbit"
          filter
          sortable
          filterPlaceholder="Search by Tanggal Terbit"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="tanggal_berlaku"
          header="Tanggal Berlaku"
          filter
          sortable
          filterPlaceholder="Search by tanggal berlaku"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="jenis_produk"
          header="Jenis Produk"
          filter
          sortable
          filterPlaceholder="Search by jenis produk"
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </div>
  );
};

export default TableCertificatePage;
