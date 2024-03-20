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
    nama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Form the "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
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

  const tanggalPembaharuanTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{convertDate(rowData.tanggal_pembaharuan)}</span>
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={dataCertificates}
        paginator
        rows={10}
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
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="alamat"
          header="Alamat"
          filter
          filterPlaceholder="Search by alamat"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="propinsi"
          header="Provinsi"
          filter
          filterPlaceholder="Search by Provinsi"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="jenis_permohonan"
          header="Jenis Permohonan"
          filter
          filterPlaceholder="Search by jenis permohonan"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="no_sertifikat"
          header="Nomor Sertifikat"
          filter
          filterPlaceholder="Search by nomor sertifikat"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="jenis_sediaan"
          header="Jenis Sediaan"
          filter
          filterPlaceholder="Search by jenis sediaan"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="tanggal_terbit"
          header="Tanggal Terbit"
          filter
          filterPlaceholder="Search by Tanggal Terbit"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="tanggal_berlaku"
          header="Tanggal Berlaku"
          filter
          filterPlaceholder="Search by tanggal berlaku"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="jenis_produk"
          header="Jenis Produk"
          filter
          filterPlaceholder="Search by jenis produk"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="tanggal_pembaharuan"
          header="Tanggal Pembaharuan"
          filter
          body={tanggalPembaharuanTemplate}
          filterPlaceholder="Search by alamat"
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </div>
  );
};

export default TableCertificatePage;
