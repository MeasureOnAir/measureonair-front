import React from 'react'
import Viewer from './Viewer'
import withAuth from '../../hooks/auth/withAuth'

const ViewerBase = ({  projectName,
    setProjectName,
    projectAttrs,
    setProjectAttrs,
    markers,
    setMarkers,
    setExcelUrl,
    setExcelFilename}) => {
  return (
    <Viewer
    projectName={projectName}
    setProjectName={setProjectName}
    projectAttrs={projectAttrs}
    setProjectAttrs={setProjectAttrs}
    markers={markers}
    setMarkers={setMarkers}
    setExcelUrl={setExcelUrl}
    setExcelFilename={setExcelFilename}
    />
  )
}

export default withAuth(ViewerBase)