import React, { useContext, useState } from "react";

import { EuiIcon, EuiSideNav, htmlIdGenerator } from "@elastic/eui";
import { useNavigate, useParams } from "react-router-dom";
import { useMatchSubpath } from "../hooks/useMatchSubpath";
import useLoadRegistry from "../queries/useLoadRegistry";
import RegistryPathContext from "../contexts/RegistryPathContext";

import { DataSourceIcon } from "../graphics/DataSourceIcon";
import { EntityIcon } from "../graphics/EntityIcon";
import { FeatureViewIcon } from "../graphics/FeatureViewIcon";
import { FeatureServiceIcon } from "../graphics/FeatureServiceIcon";
import { DatasetIcon } from "../graphics/DatasetIcon";

const SideNav = () => {
  const registryUrl = useContext(RegistryPathContext);
  const { isSuccess, data } = useLoadRegistry(registryUrl);
  const { projectName } = useParams();

  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const navigate = useNavigate();

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const dataSourcesLabel = `Data Sources ${
    isSuccess && data?.objects.dataSources
      ? `(${data?.objects.dataSources?.length})`
      : ""
  }`;

  const entitiesLabel = `Entities ${
    isSuccess && data?.objects.entities
      ? `(${data?.objects.entities?.length})`
      : ""
  }`;

  const featureViewsLabel = `Feature Views ${
    isSuccess && data?.mergedFVList && data?.mergedFVList.length > 0
      ? `(${data?.mergedFVList.length})`
      : ""
  }`;

  const featureServicesLabel = `Feature Services ${
    isSuccess && data?.objects.featureServices
      ? `(${data?.objects.featureServices?.length})`
      : ""
  }`;

  const savedDatasetsLabel = `Datasets ${
    isSuccess && data?.objects.savedDatasets
      ? `(${data?.objects.savedDatasets?.length})`
      : ""
  }`;

  const baseUrl = `${process.env.PUBLIC_URL || ""}/p/${projectName}`;

  const sideNav = [
    {
      name: "Home",
      id: htmlIdGenerator("basicExample")(),
      onClick: () => {
        navigate(`${baseUrl}/`);
      },
      items: [
        {
          name: dataSourcesLabel,
          id: htmlIdGenerator("dataSources")(),
          icon: <EuiIcon type={DataSourceIcon} />,
          onClick: () => {
            navigate(`${baseUrl}/data-source`);
          },
          isSelected: useMatchSubpath(`${baseUrl}/data-source`),
        },
        {
          name: entitiesLabel,
          id: htmlIdGenerator("entities")(),
          icon: <EuiIcon type={EntityIcon} />,
          onClick: () => {
            navigate(`${baseUrl}/entity`);
          },
          isSelected: useMatchSubpath(`${baseUrl}/entity`),
        },
        {
          name: featureViewsLabel,
          id: htmlIdGenerator("featureView")(),
          icon: <EuiIcon type={FeatureViewIcon} />,
          onClick: () => {
            navigate(`${baseUrl}/feature-view`);
          },
          isSelected: useMatchSubpath(`${baseUrl}/feature-view`),
        },
        {
          name: featureServicesLabel,
          id: htmlIdGenerator("featureService")(),
          icon: <EuiIcon type={FeatureServiceIcon} />,
          onClick: () => {
            navigate(`${baseUrl}/feature-service`);
          },
          isSelected: useMatchSubpath(`${baseUrl}/feature-service`),
        },
        {
          name: savedDatasetsLabel,
          id: htmlIdGenerator("savedDatasets")(),
          icon: <EuiIcon type={DatasetIcon} />,
          onClick: () => {
            navigate(`${baseUrl}/data-set`);
          },
          isSelected: useMatchSubpath(`${baseUrl}/data-set`),
        },
      ],
    },
  ];

  return (
    <EuiSideNav
      aria-label="Project Level"
      mobileTitle="Feast"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
    />
  );
};

export default SideNav;
